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
          user_name: 'Nutzernamen müssen mindestens 6 Zeichen lang sein.',
          user_password: 'Passwörter müssen mindestens 6 Zeichen lang sein.',
        },
      },
    },
    rules: {
      user_name: (node: FormKitNode) => (node.value as string).length >= 6,
      user_password: (node: FormKitNode) => (node.value as string).length >= 6,
    },
  };
});
