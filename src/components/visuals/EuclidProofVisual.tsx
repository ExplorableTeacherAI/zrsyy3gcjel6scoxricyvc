import { useVar } from "@/stores";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EuclidProofVisual - Number Line visualization of Euclid's proof
 * Shows that multiples of 2, 3, and 5 never land on 31.
 */
export const EuclidProofVisual = () => {
    const step = useVar('euclidStep', 0) as number;

    const primes = [2, 3, 5];
    const product = 30;
    const target = 31;
    const maxNum = 35;

    // Get color for each prime
    const getPrimeColor = (p: number) => {
        if (p === 2) return { bg: '#8b5cf6', light: '#ede9fe' }; // violet
        if (p === 3) return { bg: '#3b82f6', light: '#dbeafe' }; // blue
        return { bg: '#f97316', light: '#ffedd5' }; // orange
    };

    // Check if number is a multiple of a prime
    const isMultipleOf = (num: number, prime: number) => num % prime === 0 && num > 0;

    return (
        <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-xl p-6">
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
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg text-white"
                                    style={{ backgroundColor: getPrimeColor(p).bg }}
                                >
                                    {p}
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-slate-500">Each prime can only "step" to its own multiples</div>
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
                                        className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold shadow-md"
                                        style={{ backgroundColor: getPrimeColor(p).bg }}
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

                        {/* Number line showing 30 is reachable */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="mt-4"
                        >
                            <div className="text-sm text-slate-500 mb-3">30 is a multiple of all three:</div>
                            <div className="flex justify-center gap-2">
                                {[2, 3, 5].map(p => (
                                    <div key={p} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: getPrimeColor(p).bg }}>
                                        <span>{p}</span>
                                        <span>→</span>
                                        <span>30</span>
                                        <span>✓</span>
                                    </div>
                                ))}
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
                        className="text-center w-full"
                    >
                        <div className="text-lg text-slate-600 mb-4">Add 1 — where does 31 land?</div>
                        <div className="flex items-center gap-4 justify-center text-2xl mb-6">
                            <span className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                                {product}
                            </span>
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

                        {/* Mini number line showing 30 → 31 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex items-center justify-center gap-2 mt-4"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-100 border-2 border-blue-400 flex items-center justify-center font-bold text-blue-600">
                                30
                            </div>
                            <div className="text-2xl text-slate-400">→</div>
                            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                31
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                            className="text-slate-500 mt-3"
                        >
                            Can any prime reach 31?
                        </motion.div>
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
                        <div className="text-lg text-slate-600 mb-4">Stepping along the number line:</div>

                        {/* Number line visualization */}
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Three rows for each prime */}
                            {primes.map((prime, primeIdx) => (
                                <motion.div
                                    key={prime}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: primeIdx * 0.2 }}
                                    className="mb-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                                            style={{ backgroundColor: getPrimeColor(prime).bg }}
                                        >
                                            {prime}
                                        </div>
                                        <span className="text-sm text-slate-500">steps by {prime}s:</span>
                                    </div>

                                    {/* Number line for this prime */}
                                    <div className="relative h-10 bg-slate-100 rounded-full overflow-hidden">
                                        {/* Multiples as stepping stones */}
                                        <div className="absolute inset-0 flex items-center">
                                            {Array.from({ length: Math.floor(maxNum / prime) }, (_, i) => (i + 1) * prime).map((mult, i) => {
                                                const position = (mult / maxNum) * 100;
                                                return (
                                                    <motion.div
                                                        key={mult}
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: primeIdx * 0.2 + i * 0.05 }}
                                                        className="absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                                                        style={{
                                                            left: `calc(${position}% - 16px)`,
                                                            backgroundColor: getPrimeColor(prime).bg,
                                                        }}
                                                    >
                                                        {mult}
                                                    </motion.div>
                                                );
                                            })}

                                            {/* Target 31 marker */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: primeIdx * 0.2 + 0.5 }}
                                                className="absolute w-10 h-10 -mt-1 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg border-2 border-white"
                                                style={{ left: `calc(${(31 / maxNum) * 100}% - 20px)` }}
                                            >
                                                31
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Miss indicator */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: primeIdx * 0.2 + 0.7 }}
                                        className="flex items-center justify-end gap-2 mt-1 text-sm"
                                    >
                                        <span className="text-slate-500">
                                            {Math.floor(31 / prime) * prime} → <span className="text-orange-500 font-semibold">31</span> → {Math.ceil(31 / prime) * prime}
                                        </span>
                                        <span className="text-red-500">✗ misses!</span>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-4 text-slate-600 font-medium"
                        >
                            31 falls between the stepping stones — unreachable!
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
                            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl mb-6 ring-4 ring-offset-2 ring-emerald-400"
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
                            No stepping pattern of 2, 3, or 5 ever lands on 31. This means 31 must be prime — a new prime not in our original list!
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
