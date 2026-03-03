import { useVar } from "@/stores";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * EuclidProofVisual - Number Line visualization of Euclid's proof
 * Shows animated jumps that never land on 31.
 */
export const EuclidProofVisual = () => {
    const step = useVar('euclidStep', 0) as number;
    const [jumpPositions, setJumpPositions] = useState<number[]>([]);
    const [currentPrime, setCurrentPrime] = useState<number | null>(null);

    const primes = [2, 3, 5];
    const product = 30;
    const target = 31;
    const maxNum = 35;

    // Generate jump positions for a given prime
    useEffect(() => {
        if (step === 3) {
            // Animate through each prime
            const animateJumps = async () => {
                for (let i = 0; i < primes.length; i++) {
                    const prime = primes[i];
                    setCurrentPrime(prime);
                    const positions: number[] = [];
                    for (let j = prime; j <= maxNum; j += prime) {
                        positions.push(j);
                    }
                    setJumpPositions([]);
                    // Animate positions one by one
                    for (let k = 0; k < positions.length; k++) {
                        await new Promise(resolve => setTimeout(resolve, 150));
                        setJumpPositions(prev => [...prev, positions[k]]);
                    }
                    await new Promise(resolve => setTimeout(resolve, 800));
                }
            };
            animateJumps();
        } else {
            setJumpPositions([]);
            setCurrentPrime(null);
        }
    }, [step]);

    // Number line component
    const NumberLine = ({ highlightTarget = false, showJumps = false, showMultiples = false }: {
        highlightTarget?: boolean;
        showJumps?: boolean;
        showMultiples?: boolean;
    }) => {
        const numbers = Array.from({ length: maxNum }, (_, i) => i + 1);

        return (
            <div className="w-full overflow-x-auto pb-4">
                <div className="relative min-w-[600px] h-32">
                    {/* Number line base */}
                    <div className="absolute bottom-8 left-4 right-4 h-1 bg-slate-300 rounded-full" />

                    {/* Tick marks and numbers */}
                    <div className="absolute bottom-0 left-4 right-4 flex justify-between">
                        {numbers.filter(n => n % 5 === 0 || n === 1 || n === 31).map(num => {
                            const position = ((num - 1) / (maxNum - 1)) * 100;
                            const isTarget = num === target;
                            const isProduct = num === product;
                            const isJumpLanding = showJumps && jumpPositions.includes(num);

                            return (
                                <div
                                    key={num}
                                    className="absolute flex flex-col items-center"
                                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                                >
                                    {/* Jump landing indicator */}
                                    {isJumpLanding && (
                                        <motion.div
                                            initial={{ scale: 0, y: -20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            className="absolute -top-12 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                            style={{ backgroundColor: currentPrime === 2 ? '#8b5cf6' : currentPrime === 3 ? '#3b82f6' : '#f97316' }}
                                        >
                                            {currentPrime}
                                        </motion.div>
                                    )}

                                    {/* Tick mark */}
                                    <div
                                        className={`w-0.5 h-3 ${isTarget && highlightTarget ? 'bg-emerald-500 h-5' : isProduct ? 'bg-blue-500 h-4' : 'bg-slate-400'}`}
                                    />

                                    {/* Number label */}
                                    <span
                                        className={`text-sm mt-1 font-medium ${
                                            isTarget && highlightTarget
                                                ? 'text-emerald-600 text-lg font-bold'
                                                : isProduct
                                                    ? 'text-blue-600 font-semibold'
                                                    : 'text-slate-500'
                                        }`}
                                    >
                                        {num}
                                    </span>

                                    {/* Target marker */}
                                    {isTarget && highlightTarget && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-16"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                31
                                            </div>
                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-orange-500 mx-auto" />
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full"
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
                        <div className="text-slate-500">These can "jump" along the number line</div>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full"
                    >
                        <div className="text-lg text-slate-600 mb-4">Multiply them together:</div>
                        <div className="flex items-center gap-3 justify-center text-2xl mb-6">
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
                        <NumberLine />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full"
                    >
                        <div className="text-lg text-slate-600 mb-4">Add 1 to land on our target:</div>
                        <div className="flex items-center gap-4 justify-center text-2xl mb-6">
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
                        <NumberLine highlightTarget />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full"
                    >
                        <div className="text-lg text-slate-600 mb-2">Watch each prime try to reach 31:</div>
                        <div className="flex gap-6 justify-center mb-4">
                            {primes.map((p) => (
                                <div
                                    key={p}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                                        currentPrime === p ? 'bg-slate-200' : ''
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold ${
                                        p === 2 ? 'bg-violet-500' : p === 3 ? 'bg-blue-500' : 'bg-orange-500'
                                    }`}>
                                        {p}
                                    </div>
                                    <span className="text-sm text-slate-600">jumps of {p}</span>
                                </div>
                            ))}
                        </div>

                        {/* Animated number line with jumps */}
                        <div className="w-full overflow-x-auto pb-4">
                            <div className="relative min-w-[600px] h-40">
                                {/* Number line base */}
                                <div className="absolute bottom-8 left-4 right-4 h-1 bg-slate-300 rounded-full" />

                                {/* All numbers with jump indicators */}
                                <div className="absolute bottom-0 left-4 right-4">
                                    {Array.from({ length: maxNum }, (_, i) => i + 1).map(num => {
                                        const position = ((num - 1) / (maxNum - 1)) * 100;
                                        const isTarget = num === target;
                                        const isJumpLanding = jumpPositions.includes(num);
                                        const showTick = num % 5 === 0 || num === 1 || num === 31;

                                        return (
                                            <div
                                                key={num}
                                                className="absolute flex flex-col items-center"
                                                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                                            >
                                                {/* Jump landing marker */}
                                                {isJumpLanding && (
                                                    <motion.div
                                                        initial={{ scale: 0, y: -30 }}
                                                        animate={{ scale: 1, y: 0 }}
                                                        className="absolute -top-14"
                                                    >
                                                        <div
                                                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                                                            style={{
                                                                backgroundColor: currentPrime === 2 ? '#8b5cf6' : currentPrime === 3 ? '#3b82f6' : '#f97316'
                                                            }}
                                                        >
                                                            ✓
                                                        </div>
                                                        <div
                                                            className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent mx-auto"
                                                            style={{
                                                                borderTopColor: currentPrime === 2 ? '#8b5cf6' : currentPrime === 3 ? '#3b82f6' : '#f97316'
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}

                                                {/* Target marker (31) */}
                                                {isTarget && (
                                                    <div className="absolute -top-20">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                                                            31
                                                        </div>
                                                        <div className="text-xs text-orange-600 font-semibold mt-1 whitespace-nowrap">Target!</div>
                                                    </div>
                                                )}

                                                {/* Tick mark */}
                                                {showTick && (
                                                    <>
                                                        <div className={`w-0.5 ${isTarget ? 'h-5 bg-orange-500' : 'h-3 bg-slate-400'}`} />
                                                        <span className={`text-xs mt-1 ${isTarget ? 'text-orange-600 font-bold' : 'text-slate-500'}`}>
                                                            {num}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-500 mt-2"
                        >
                            {currentPrime && `Jumping by ${currentPrime}s... never lands on 31!`}
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
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl mb-6"
                        >
                            31
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-emerald-600 font-semibold mb-2"
                        >
                            31 is unreachable — it's a new prime!
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-slate-500 max-w-sm mx-auto"
                        >
                            No combination of jumps by 2, 3, or 5 can ever land exactly on 31. This means 31 must be prime — a new prime not in our original list!
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
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
