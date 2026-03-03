import { useVar } from "@/stores";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EuclidProofVisual - Interactive visualization of Euclid's proof
 * that there are infinitely many primes.
 *
 * Reads the 'euclidStep' variable to determine which step to show.
 */
export const EuclidProofVisual = () => {
    const step = useVar('euclidStep', 0) as number;

    // Prime numbers and calculations for each step
    const primes = [2, 3, 5];
    const product = primes.reduce((a, b) => a * b, 1); // 30
    const productPlusOne = product + 1; // 31

    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                    >
                        <div className="text-lg text-slate-600 mb-4">Suppose we only knew these primes:</div>
                        <div className="flex gap-4 justify-center">
                            {primes.map((p, i) => (
                                <motion.div
                                    key={p}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="w-16 h-16 rounded-full bg-violet-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg"
                                >
                                    {p}
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 text-slate-500">The first three prime numbers</div>
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
                        <div className="flex items-center gap-3 justify-center text-2xl">
                            {primes.map((p, i) => (
                                <span key={p} className="flex items-center gap-3">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.15 }}
                                        className="w-12 h-12 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold shadow-md"
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
                                className="w-16 h-16 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg"
                            >
                                {product}
                            </motion.span>
                        </div>
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
                        <div className="text-lg text-slate-600 mb-4">Now add 1:</div>
                        <div className="flex items-center gap-4 justify-center text-2xl">
                            <motion.span
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                className="w-16 h-16 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg"
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
                                className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-3xl shadow-xl"
                            >
                                {productPlusOne}
                            </motion.span>
                        </div>
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
                        <div className="text-lg text-slate-600 mb-6">Can 2, 3, or 5 divide 31?</div>
                        <div className="space-y-3">
                            {primes.map((p, i) => (
                                <motion.div
                                    key={p}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.3 }}
                                    className="flex items-center justify-center gap-4"
                                >
                                    <span className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold">
                                        {p}
                                    </span>
                                    <span className="text-slate-400">divides</span>
                                    <span className="w-12 h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                                        31
                                    </span>
                                    <span className="text-slate-400">=</span>
                                    <span className="text-lg text-slate-600">
                                        {(31 / p).toFixed(2)}...
                                    </span>
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.3 + 0.2 }}
                                        className="text-2xl"
                                    >
                                        ❌
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 text-slate-500"
                        >
                            None of them divide evenly — always remainder 1!
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
                            31 is a new prime!
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-slate-500 max-w-xs mx-auto"
                        >
                            We found a prime not in our original list. This process works no matter how many primes we start with — so there must be infinitely many!
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
