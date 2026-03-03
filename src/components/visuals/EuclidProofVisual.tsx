import { useVar } from "@/stores";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * EuclidProofVisual - Factor Tree visualization of Euclid's proof
 * Shows animated attempts to factor 31 that all fail.
 */
export const EuclidProofVisual = () => {
    const step = useVar('euclidStep', 0) as number;
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const [showFailure, setShowFailure] = useState(false);

    const primes = [2, 3, 5];
    const product = 30;
    const target = 31;

    // Animate through factor attempts in step 3
    useEffect(() => {
        if (step === 3) {
            setCurrentAttempt(0);
            setShowFailure(false);

            const animateAttempts = async () => {
                for (let i = 0; i < primes.length; i++) {
                    setCurrentAttempt(i);
                    setShowFailure(false);
                    await new Promise(resolve => setTimeout(resolve, 600));
                    setShowFailure(true);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            };
            animateAttempts();
        } else {
            setCurrentAttempt(0);
            setShowFailure(false);
        }
    }, [step]);

    // Factor tree node component
    const TreeNode = ({
        value,
        color = "bg-slate-200",
        textColor = "text-slate-700",
        size = "normal",
        highlight = false
    }: {
        value: string | number;
        color?: string;
        textColor?: string;
        size?: "small" | "normal" | "large";
        highlight?: boolean;
    }) => {
        const sizeClasses = {
            small: "w-10 h-10 text-sm",
            normal: "w-14 h-14 text-lg",
            large: "w-20 h-20 text-2xl"
        };

        return (
            <div className={`
                ${sizeClasses[size]} rounded-full ${color} ${textColor}
                flex items-center justify-center font-bold shadow-md
                ${highlight ? 'ring-4 ring-offset-2 ring-emerald-400' : ''}
            `}>
                {value}
            </div>
        );
    };

    // Branch line component
    const Branch = ({ failed = false }: { failed?: boolean }) => (
        <div className={`w-0.5 h-8 ${failed ? 'bg-red-300' : 'bg-slate-300'}`} />
    );

    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="text-lg text-slate-600 mb-6">Our list of primes:</div>
                        <div className="flex gap-4 justify-center mb-8">
                            {primes.map((p, i) => (
                                <motion.div
                                    key={p}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg text-white ${
                                        p === 2 ? 'bg-violet-500' : p === 3 ? 'bg-blue-500' : 'bg-orange-500'
                                    }`}
                                >
                                    {p}
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-slate-500">We'll try to use these to factor our number</div>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="text-lg text-slate-600 mb-4">Multiply them together:</div>
                        <div className="flex items-center gap-3 justify-center text-2xl mb-8">
                            {primes.map((p, i) => (
                                <span key={p} className="flex items-center gap-3">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.15 }}
                                        className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold shadow-md ${
                                            p === 2 ? 'bg-violet-500' : p === 3 ? 'bg-blue-500' : 'bg-orange-500'
                                        }`}
                                    >
                                        {p}
                                    </motion.span>
                                    {i < primes.length - 1 && (
                                        <span className="text-slate-400">×</span>
                                    )}
                                </span>
                            ))}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-slate-400 mx-2"
                            >
                                =
                            </motion.span>
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 }}
                                className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg"
                            >
                                {product}
                            </motion.span>
                        </div>

                        {/* Factor tree for 30 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-sm text-slate-500 mb-3">30 can be factored:</div>
                            <TreeNode value={30} color="bg-blue-500" textColor="text-white" />
                            <div className="flex gap-12 mt-2">
                                <Branch />
                                <Branch />
                            </div>
                            <div className="flex gap-8">
                                <TreeNode value={2} color="bg-violet-500" textColor="text-white" size="small" />
                                <TreeNode value={15} color="bg-slate-300" textColor="text-slate-700" size="small" />
                            </div>
                            <div className="ml-16 flex gap-8 mt-2">
                                <Branch />
                                <Branch />
                            </div>
                            <div className="ml-16 flex gap-4">
                                <TreeNode value={3} color="bg-blue-500" textColor="text-white" size="small" />
                                <TreeNode value={5} color="bg-orange-500" textColor="text-white" size="small" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="text-lg text-slate-600 mb-4">Add 1 — can we factor this?</div>
                        <div className="flex items-center gap-4 justify-center text-2xl mb-8">
                            <motion.span
                                className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg"
                            >
                                {product}
                            </motion.span>
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl text-emerald-500 font-bold"
                            >
                                + 1
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-slate-400"
                            >
                                =
                            </motion.span>
                            <motion.span
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.7, type: "spring" }}
                                className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-2xl shadow-xl"
                            >
                                {target}
                            </motion.span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col items-center"
                        >
                            <TreeNode value={31} color="bg-gradient-to-br from-orange-400 to-orange-600" textColor="text-white" size="large" />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="mt-4 text-lg text-slate-500"
                            >
                                Let's try to break it down...
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="text-lg text-slate-600 mb-4">Trying to factor 31:</div>

                        <div className="flex flex-col items-center">
                            <TreeNode value={31} color="bg-gradient-to-br from-orange-400 to-orange-600" textColor="text-white" size="large" />

                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                className="w-0.5 h-10 bg-slate-300 origin-top mt-2"
                            />

                            {/* Attempt branches */}
                            <div className="flex gap-16 items-start">
                                {primes.map((p, i) => (
                                    <motion.div
                                        key={p}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{
                                            opacity: currentAttempt >= i ? 1 : 0.3,
                                            y: 0
                                        }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col items-center"
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-md text-white ${
                                            p === 2 ? 'bg-violet-500' : p === 3 ? 'bg-blue-500' : 'bg-orange-500'
                                        }`}>
                                            {p}
                                        </div>

                                        {currentAttempt === i && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-2 text-sm text-slate-500"
                                            >
                                                31 ÷ {p} = {(31 / p).toFixed(2)}...
                                            </motion.div>
                                        )}

                                        {currentAttempt === i && showFailure && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="mt-2"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center">
                                                    <span className="text-red-500 text-xl">✗</span>
                                                </div>
                                                <div className="text-xs text-red-500 mt-1">Not whole!</div>
                                            </motion.div>
                                        )}

                                        {currentAttempt > i && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="mt-2"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-400 flex items-center justify-center">
                                                    <span className="text-red-500 text-xl">✗</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentAttempt >= 2 && showFailure ? 1 : 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-slate-600 font-medium"
                        >
                            All branches lead to dead ends!
                        </motion.div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="flex flex-col items-center mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <TreeNode value={31} color="bg-gradient-to-br from-emerald-400 to-emerald-600" textColor="text-white" size="large" highlight />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-4 flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <span className="text-emerald-600">1</span>
                                </div>
                                <span className="text-slate-400">×</span>
                                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                                    31
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-2 text-sm text-slate-500"
                            >
                                Only factors: 1 and itself
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl text-emerald-600 font-semibold mb-2"
                        >
                            31 is prime — unfactorable!
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-slate-500 max-w-sm mx-auto"
                        >
                            The factor tree has no branches. 31 is a new prime that wasn't in our original list — proving there are always more primes to discover!
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="mt-6 text-4xl"
                        >
                            ∞
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EuclidProofVisual;
