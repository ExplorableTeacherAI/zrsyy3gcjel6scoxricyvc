import { useVar } from "@/stores";
import { motion, AnimatePresence } from "framer-motion";

/**
 * EuclidProofVisual - Factor Tree visualization of Euclid's proof
 * Shows that 31 cannot be factored by 2, 3, or 5.
 */
export const EuclidProofVisual = () => {
    const step = useVar('euclidStep', 0) as number;

    const primes = [2, 3, 5];
    const product = 30;
    const target = 31;

    // Get color for each prime
    const getPrimeColor = (p: number) => {
        if (p === 2) return '#8b5cf6'; // violet
        if (p === 3) return '#3b82f6'; // blue
        return '#f97316'; // orange
    };

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
                                    style={{ backgroundColor: getPrimeColor(p) }}
                                >
                                    {p}
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-slate-500">We'll try to use these to factor numbers</div>
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
                        <div className="flex items-center gap-3 justify-center text-2xl mb-6">
                            {primes.map((p, i) => (
                                <span key={p} className="flex items-center gap-3">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.15 }}
                                        className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold shadow-md"
                                        style={{ backgroundColor: getPrimeColor(p) }}
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
                            transition={{ delay: 0.9 }}
                            className="flex flex-col items-center mt-4"
                        >
                            <div className="text-sm text-slate-500 mb-3">30 breaks down nicely:</div>

                            {/* Tree visualization */}
                            <svg width="200" height="140" className="overflow-visible">
                                {/* 30 at top */}
                                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                    <circle cx="100" cy="25" r="22" fill="#2563eb" />
                                    <text x="100" y="31" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">30</text>
                                </motion.g>

                                {/* Branches to 2 and 15 */}
                                <motion.line x1="85" y1="45" x2="50" y2="70" stroke="#94a3b8" strokeWidth="2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
                                <motion.line x1="115" y1="45" x2="150" y2="70" stroke="#94a3b8" strokeWidth="2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />

                                {/* 2 */}
                                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}>
                                    <circle cx="50" cy="85" r="18" fill="#8b5cf6" />
                                    <text x="50" y="90" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">2</text>
                                </motion.g>

                                {/* 15 */}
                                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}>
                                    <circle cx="150" cy="85" r="18" fill="#cbd5e1" />
                                    <text x="150" y="90" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="12">15</text>
                                </motion.g>

                                {/* Branches from 15 to 3 and 5 */}
                                <motion.line x1="138" y1="100" x2="120" y2="120" stroke="#94a3b8" strokeWidth="2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6 }} />
                                <motion.line x1="162" y1="100" x2="180" y2="120" stroke="#94a3b8" strokeWidth="2"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6 }} />

                                {/* 3 */}
                                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}>
                                    <circle cx="120" cy="130" r="15" fill="#3b82f6" />
                                    <text x="120" y="135" textAnchor="middle" fill="white" fontWeight="bold" fontSize="11">3</text>
                                </motion.g>

                                {/* 5 */}
                                <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8 }}>
                                    <circle cx="180" cy="130" r="15" fill="#f97316" />
                                    <text x="180" y="135" textAnchor="middle" fill="white" fontWeight="bold" fontSize="11">5</text>
                                </motion.g>
                            </svg>
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
                        <div className="text-lg text-slate-600 mb-4">Add 1 — can we factor 31?</div>
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
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center font-bold text-2xl shadow-xl"
                            >
                                {target}
                            </motion.span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-slate-500 mt-4"
                        >
                            Let's try to build a factor tree for 31...
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

                        {/* Factor tree with failed attempts */}
                        <svg width="280" height="220" className="overflow-visible mx-auto">
                            {/* 31 at top */}
                            <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
                                <circle cx="140" cy="30" r="28" fill="url(#orangeGradient)" />
                                <text x="140" y="37" textAnchor="middle" fill="white" fontWeight="bold" fontSize="18">31</text>
                            </motion.g>

                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fb923c" />
                                    <stop offset="100%" stopColor="#ea580c" />
                                </linearGradient>
                            </defs>

                            {/* Three branches for attempts */}
                            {primes.map((prime, i) => {
                                const xPos = 70 + i * 70;
                                const startX = 140 + (i - 1) * 30;

                                return (
                                    <g key={prime}>
                                        {/* Branch line */}
                                        <motion.line
                                            x1={startX} y1="55" x2={xPos} y2="90"
                                            stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ delay: 0.3 + i * 0.2 }}
                                        />

                                        {/* Prime circle */}
                                        <motion.g
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.2 }}
                                        >
                                            <circle cx={xPos} cy="110" r="20" fill={getPrimeColor(prime)} />
                                            <text x={xPos} y="116" textAnchor="middle" fill="white" fontWeight="bold" fontSize="14">{prime}</text>
                                        </motion.g>

                                        {/* Division result */}
                                        <motion.text
                                            x={xPos} y="145"
                                            textAnchor="middle"
                                            fill="#64748b"
                                            fontSize="11"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.7 + i * 0.2 }}
                                        >
                                            31÷{prime}
                                        </motion.text>
                                        <motion.text
                                            x={xPos} y="160"
                                            textAnchor="middle"
                                            fill="#64748b"
                                            fontSize="11"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.7 + i * 0.2 }}
                                        >
                                            = {(31 / prime).toFixed(1)}...
                                        </motion.text>

                                        {/* X mark */}
                                        <motion.g
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.9 + i * 0.2 }}
                                        >
                                            <circle cx={xPos} cy="190" r="16" fill="#fee2e2" stroke="#f87171" strokeWidth="2" />
                                            <text x={xPos} y="196" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="16">✗</text>
                                        </motion.g>
                                    </g>
                                );
                            })}
                        </svg>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-2 text-slate-600 font-medium"
                        >
                            Every branch leads to a dead end!
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
                        {/* Successful tree showing 31 = 1 × 31 only */}
                        <svg width="200" height="120" className="overflow-visible mx-auto mb-4">
                            {/* 31 at top - now green */}
                            <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                                <circle cx="100" cy="35" r="30" fill="url(#greenGradient)" stroke="#34d399" strokeWidth="3" />
                                <text x="100" y="43" textAnchor="middle" fill="white" fontWeight="bold" fontSize="20">31</text>
                            </motion.g>

                            <defs>
                                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#34d399" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                            </defs>

                            {/* Only factors: 1 and 31 */}
                            <motion.line x1="80" y1="62" x2="55" y2="85" stroke="#94a3b8" strokeWidth="2"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
                            <motion.line x1="120" y1="62" x2="145" y2="85" stroke="#94a3b8" strokeWidth="2"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />

                            <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                                <circle cx="55" cy="100" r="18" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
                                <text x="55" y="106" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="14">1</text>
                            </motion.g>

                            <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                                <circle cx="145" cy="100" r="18" fill="#10b981" />
                                <text x="145" y="106" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">31</text>
                            </motion.g>
                        </svg>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-sm text-slate-500 mb-4"
                        >
                            Only factors: 1 × 31
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="text-xl text-emerald-600 font-semibold mb-2"
                        >
                            31 is prime — unfactorable!
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="text-slate-500 max-w-sm mx-auto"
                        >
                            The factor tree has no real branches. 31 is a new prime not in our original list — proving there are always more primes!
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 }}
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
