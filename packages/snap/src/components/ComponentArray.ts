import { NodeType, heading } from '@metamask/snaps-ui';

/**
 * Creates a MetaMask component array with a heading.
 *  
 * @param headingText - The text to display in the heading.
 * @returns A MetaMask component array with a heading.
 */
export const NewComponentArray = (headingText: string) => {
  var components: (
    | {
        value: string;
        type: NodeType.Copyable;
      }
    | {
        type: NodeType.Divider;
      }
    | {
        value: string;
        type: NodeType.Heading;
      }
    | {
        type: NodeType.Spinner;
      }
    | {
        value: string;
        type: NodeType.Text;
      }
  )[] = [heading(headingText)];
  return components;
};
