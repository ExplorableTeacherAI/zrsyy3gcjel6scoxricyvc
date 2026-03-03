import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, ScrollytellingLayout, ScrollStep, ScrollVisual } from "@/components/layouts";
import { EditableH2, EditableH3, EditableParagraph, InlineTooltip } from "@/components/atoms";
import { EuclidProofVisual } from "@/components/visuals/EuclidProofVisual";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

/**
 * ------------------------------------------------------------------
 * BLOCK CONFIGURATION
 * ------------------------------------------------------------------
 * This file is the entry point for your lesson content.
 * 
 * INSTRUCTIONS:
 * 1. Create your content using <Block> components.
 * 2. Use Layout components to organize your blocks.
 * 3. Add your blocks to the `blocks` array below.
 * 
 * ------------------------------------------------------------------
 * CROSS-BLOCK VARIABLES
 * ------------------------------------------------------------------
 * Variables can be shared across blocks using the global store.
 * 
 * DEFINE VARIABLES: src/data/variables.ts (use only variables.ts in this file; same structure as exampleBlocks + exampleVariables)
 * 
 * USAGE IN BLOCKS:
 * 
 * // Reading a value (auto-updates when changed):
 * import { useVar } from '@/stores';
 * const amplitude = useVar('amplitude', 1);
 * 
 * // Setting a value:
 * import { useSetVar } from '@/stores';
 * const setVar = useSetVar();
 * setVar('amplitude', 2.5);
 * 
 * // InlineScrubbleNumber (from variables.ts): getVariableInfo(name) + numberPropsFromDefinition(...)
 * <InlineScrubbleNumber varName="amplitude" {...numberPropsFromDefinition(getVariableInfo('amplitude'))} />
 * 
 * ------------------------------------------------------------------
 * AVAILABLE LAYOUTS
 * ------------------------------------------------------------------
 * 
 * 1. StackLayout
 *    - Best for: Title headers, introductory text, broad visualizations.
 *    - Usage:
 *      <StackLayout maxWidth="xl">
 *          <Block id="intro">...</Block>
 *      </StackLayout>
 * 
 * 2. SplitLayout
 *    - Best for: Side-by-side content (e.g., Text + Visualization).
 *    - Usage:
 *      <SplitLayout ratio="1:1" gap="lg">
 *          <Block id="left">...</Block>
 *          <Block id="right">...</Block>
 *      </SplitLayout>
 * 
 * 3. GridLayout
 *    - Best for: Multiple equal-sized items (cards, galleries).
 *    - Usage:
 *      <GridLayout columns={3} gap="md">
 *          <Block id="item-1">...</Block>
 *          <Block id="item-2">...</Block>
 *          <Block id="item-3">...</Block>
 *      </GridLayout>
 * 
 * 4. ScrollytellingLayout
 *    - Best for: Narrative steps with a reactive sticky visualization.
 *    - Usage:
 *      <ScrollytellingLayout varName="scrollStep" visualPosition="right">
 *          <ScrollStep><Block id="step-0">...</Block></ScrollStep>
 *          <ScrollStep><Block id="step-1">...</Block></ScrollStep>
 *          <ScrollVisual><Block id="viz">...</Block></ScrollVisual>
 *      </ScrollytellingLayout>
 * 
 * EXAMPLES:
 * See `src/data/exampleBlocks.tsx` for comprehensive examples.
 * 
 * NOTE: If you are seeing examples in the browser instead of this content,
 * check your .env file and set VITE_SHOW_EXAMPLES=false.
 */

export const blocks: ReactElement[] = [
    <StackLayout key="layout-history-title" maxWidth="xl">
        <Block id="block-history-title" padding="md">
            <EditableH2 id="h2-history-title" blockId="block-history-title">
                The Dawn of Mathematics
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-history-para" maxWidth="xl">
        <Block id="block-history-para" padding="sm">
            <EditableParagraph id="para-history" blockId="block-history-para">
                Long before calculators or computers, ancient civilizations were already wrestling with numbers and shapes. The{" "}
                <InlineTooltip
                    id="tooltip-egyptians"
                    tooltip="An ancient civilization along the Nile River (c. 3100–30 BCE) known for pyramids and hieroglyphic writing."
                    color="#f97316"
                >
                    Egyptians
                </InlineTooltip>
                {" "}used geometry to resurvey their farmland after the Nile's annual floods, while the{" "}
                <InlineTooltip
                    id="tooltip-babylonians"
                    tooltip="An ancient Mesopotamian civilization (c. 1894–539 BCE) famous for developing a base-60 number system still used in telling time today."
                    color="#3b82f6"
                >
                    Babylonians
                </InlineTooltip>
                {" "}developed a sophisticated base-60 number system — which is why we still have 60 seconds in a minute and 360 degrees in a circle. The{" "}
                <InlineTooltip
                    id="tooltip-greeks"
                    tooltip="Ancient Greek mathematicians (c. 600 BCE–300 CE) pioneered logical proofs and abstract thinking in mathematics."
                    color="#8b5cf6"
                >
                    Greeks
                </InlineTooltip>
                {" "}transformed mathematics from a practical tool into an art of pure reasoning — Euclid's proof that there are infinitely many prime numbers is still taught today, over 2,300 years later.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-euclid-title" maxWidth="2xl">
        <Block id="block-1772532256404" padding="md">
            <EditableH3 id="h3-euclid-title" blockId="block-1772532256404">
                Euclid's Proof: Infinitely Many Primes
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-euclid-intro" maxWidth="2xl">
        <Block id="block-euclid-intro" padding="sm">
            <EditableParagraph id="para-euclid-intro" blockId="block-euclid-intro">
                Around 300 BCE, Euclid crafted one of the most elegant proofs in all of mathematics. He showed that no matter how many prime numbers you know, there must always be at least one more. Scroll through to see how the argument unfolds.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <ScrollytellingLayout key="layout-euclid-proof" varName="euclidStep" visualPosition="right" visualWidth="medium" gap="xl">
        <ScrollStep>
            <Block id="block-euclid-step-0" padding="sm">
                <EditableParagraph id="para-euclid-step-0" blockId="block-euclid-step-0">
                    <strong>Step 1: Start with any list of primes.</strong><br /><br />
                    Suppose someone claims there are only finitely many primes. Let's say they give us a list: 2, 3, and 5. Euclid will show this list must be incomplete.
                </EditableParagraph>
            </Block>
        </ScrollStep>

        <ScrollStep>
            <Block id="block-euclid-step-1" padding="sm">
                <EditableParagraph id="para-euclid-step-1" blockId="block-euclid-step-1">
                    <strong>Step 2: Multiply all the primes together.</strong><br /><br />
                    Take every prime in our list and multiply them: 2 × 3 × 5 = 30. This product is divisible by every prime we know.
                </EditableParagraph>
            </Block>
        </ScrollStep>

        <ScrollStep>
            <Block id="block-euclid-step-2" padding="sm">
                <EditableParagraph id="para-euclid-step-2" blockId="block-euclid-step-2">
                    <strong>Step 3: Add 1 to the product.</strong><br /><br />
                    Here's the clever part: add 1 to get 31. This new number has a remarkable property — when you divide it by any prime in our list, you always get a remainder of 1.
                </EditableParagraph>
            </Block>
        </ScrollStep>

        <ScrollStep>
            <Block id="block-euclid-step-3" padding="sm">
                <EditableParagraph id="para-euclid-step-3" blockId="block-euclid-step-3">
                    <strong>Step 4: Check divisibility.</strong><br /><br />
                    31 ÷ 2 = 15.5 (not whole)<br />
                    31 ÷ 3 = 10.33... (not whole)<br />
                    31 ÷ 5 = 6.2 (not whole)<br /><br />
                    None of our known primes divide 31 evenly!
                </EditableParagraph>
            </Block>
        </ScrollStep>

        <ScrollStep>
            <Block id="block-euclid-step-4" padding="sm">
                <EditableParagraph id="para-euclid-step-4" blockId="block-euclid-step-4">
                    <strong>Step 5: The conclusion.</strong><br /><br />
                    Since 31 isn't divisible by any prime in our list, either 31 itself is prime, or it has a prime factor we haven't discovered yet. Either way, our list was incomplete! This argument works no matter how long the original list is — proving there are infinitely many primes.
                </EditableParagraph>
            </Block>
        </ScrollStep>

        <ScrollVisual>
            <Block id="block-euclid-viz" padding="none" hasVisualization>
                <EuclidProofVisual />
            </Block>
        </ScrollVisual>
    </ScrollytellingLayout>,
];
