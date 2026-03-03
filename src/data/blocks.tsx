import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineTooltip } from "@/components/atoms";

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
];
