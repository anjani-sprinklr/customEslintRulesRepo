export default {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Description of the rule',
      },
      fixable: 'code',
      schema: [], // no options
    },
    create(context) {
      const map = new Map();
  
      const regex = /(use.*(Query|Mutation))$|(^@apollo\/client$)/;
      return {
        ImportDeclaration(node) {
          const path = node.source.value;
          if (node.specifiers.length) {
            const variableName = node.specifiers[0].local.name;
            if (regex.test(path)) {
              map.set(variableName, path);
            }
          }
         
        },
        VariableDeclarator(node) {
          if (node.init && node.init.callee && node.init.callee.name === 'require') {
            const path = node.init.arguments[0].value;
            const variableName = node.id.name;
            if (regex.test(path)) {
              map.set(variableName, path);
            }
          }
        },
        MemberExpression(node) {
          if (
            node.object &&
            node.object.name === 'jest' &&
            node.property.name === 'spyOn'
          ) {
            const variableName = node.parent.arguments[0].name;
            if (map.has(variableName)) {
              context.report({
                node: node,
                message:
                  'Spying on @apollo/client, custom hooks utlising useQuery,useMutation not allowed, use Mock Provider instead to mock them',
              });
            }
            const isRequirePresentInSpyOn = node.parent.arguments[0].arguments;
            if (isRequirePresentInSpyOn) {
              const path = isRequirePresentInSpyOn[0].value;
              const isApolloBeingSpied = regex.test(path);
              if (isApolloBeingSpied) {
                context.report({
                  node: node,
                  message:
                    'Spying (rquire(..)) on @apollo/client, custom hooks utlising useQuery,useMutation not allowed, use Mock Provider instead to mock them',
                });
              }
            }
          }
  
          if (
            node.object && node.parent &&
            node.object.name === 'jest' &&
            (node.property.name === 'mock' || node.property.name === 'doMock')
          ) {
            const isApolloMocked = regex.test(node.parent.arguments[0].value);
            if (isApolloMocked) {
              context.report({
                node: node,
                message:
                  "Mocking on @apollo/client, custom hooks utlising useQuery,useMutation ain't allowed, use Mock Provider instead to mock them",
              });
            }

            if (node.parent && (node.parent.arguments.length > 1)) {
              const insideCallback = node.parent.arguments[1].body.properties;
              if (insideCallback) {
                
                insideCallback.forEach((property) => {
                  const isuseQueryPresent = regex.test(property.key.name);
                  if (isuseQueryPresent) {
                    context.report({
                      node: node,
                      message:
                        "Mocking on @apollo/client, custom hooks utlising useQuery,useMutation (in the second argument) ain't allowed, use Mock Provider instead to mock them",
                    });
                  }
                });
              }
            }
          }
        },
      };
    },
  };
  