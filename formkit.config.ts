import { defaultConfig, defineFormKitConfig } from '@formkit/vue';
import { createAutoAnimatePlugin } from '@formkit/addons';
import type { FormKitNode } from '@formkit/core';
import { de } from '@formkit/i18n';

export type FormKitRuleArraySyntax = [rule: string, ...args: any[]][];

const legends = ['checkbox_multi', 'radio_multi', 'repeater', 'transferlist'];

const addAsteriskPlugin = (node: FormKitNode) => {
  if (['button', 'submit', 'hidden', 'group', 'list', 'meta'].includes(node.props.type)) return;

  node.on('created', () => {
    const legendOrLabel = legends.includes(`${node.props.type}${node.props.options ? '_multi' : ''}`) ? 'legend' : 'label';

    if (node.props.definition?.schemaMemoKey) {
      node.props.definition.schemaMemoKey += `${node.props.options ? '_multi' : ''}_add_asterisk`;
    }

    if (node.props.definition) {
      const schemaFn = node.props.definition?.schema;
      node.props.definition.schema = (sectionsSchema = {}) => {
        sectionsSchema[legendOrLabel] = {
          children: [
            '$label',
            {
              $el: 'span',
              if: '$state.required',
              attrs: {
                class: '$classes.asterisk',
              },
              children: ['*'],
            },
          ],
        };
        return (schemaFn as any)(sectionsSchema);
      };
    }
  });
};

export default defineFormKitConfig(() => {
  return {
    ...defaultConfig(),
    plugins: [
      addAsteriskPlugin,
      createAutoAnimatePlugin({
        duration: 250,
        easing: 'ease-in-out',
      }),
    ],
    locales: { de },
    locale: 'de',
    props: {
      actions: false,
      incompleteMessage: false,
    },
    messages: {
      de: {
        validation: {
          length: ({ name, args }) => {
            if (args.length === 2) {
              return `${name} muss zwischen ${args[0]} und ${args[1]} Zeichen lang sein.`;
            }

            return `${name} muss mindestens ${args[0]} Zeichen lang sein.`;
          },
          new_username: 'Diesen Nutzernamen verwendest du bereits.',
          unique_username: 'Dieser Nutzername ist leider schon vergeben.',
          trimmed: ({ name }) => `${name} enhält unerlaubte Leerzeichen.`,
        },
      },
    },
    rules: {
      trimmed: (node: FormKitNode) => {
        return (node.value as string).length === 0 || !!(node.value as string).match(/^\S+(?: +\S+)*$/);
      },
      new_username: (node: FormKitNode) => {
        const user = useSupabaseUser();
        if (!user.value) return false;
        return user.value.user_metadata.display_name !== node.value;
      },
      unique_username: async (node: FormKitNode) => {
        const supabase = useSupabaseClient();

        const { error, data } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', node.value as string)
          .maybeSingle();

        if (error) {
          return false;
        }

        return !data;
      },
    },
  };
});
