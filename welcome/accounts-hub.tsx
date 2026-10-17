
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { 
    PlusCircle, 
    ArrowRight, 
    Grid3x3, 
    ShieldAlert, 
    Clock, 
    CheckCircle,
    FileCheck,
    Briefcase,
    Zap,
    TrendingUp,
    ShieldCheck,
    Trophy,
    LayoutDashboard,
    Activity,
    Target,
    Timer,
    FlaskConical,
    MessageSquare,
    AlertTriangle,
    Lock,
    Star,
    Sparkles,
    Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';

const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string; }) => (
    <div className={cn('bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-lg overflow-hidden', className)}>
        {children}
    </div>
);

const UserAvatar = () => (
  <div className="relative h-20 w-20 shrink-0">
    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-md opacity-75 animate-pulse"></div>
    <div className="relative h-20 w-20 flex items-center justify-center bg-slate-900 rounded-full border-2 border-white/10 overflow-hidden shadow-2xl">
      <Image src="/bitmoji.png" alt="User Avatar" width={80} height={80} className="object-cover" />
    </div>
  </div>
);

function GraceTimer({ expiry }: { expiry: string }) {
    const [timeLeft, setTimeLeft] = useState<string>('--:--:--');

    useEffect(() => {
        const update = () => {
            const diff = differenceInSeconds(new Date(expiry), new Date());
            if (diff <= 0) {
                setTimeLeft('EXPIRED');
                return;
            }
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;
            setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };
        const interval = setInterval(update, 1000);
        update();
        return () => clearInterval(interval);
    }, [expiry]);

    return (
        <div className="flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-2">
            <Timer className="w-3 h-3 animate-pulse" />
            KYC required in: {timeLeft}
        </div>
    );
}

const AccountCard = ({ account, kycVerified }: { account: any, kycVerified: boolean }) => {
    const isBlocked = account.is_blocked;
    const paymentApproved = account.is_approved;
    const isBreached = account.status === 'breached';
    const isDeleted = account.status === 'deleted';
    const isPtp = account.account_model === 'passthrupay';
    const isTrial = account.is_trial;
    const hasGracePeriod = !!account.grace_period_expiry && !kycVerified;

    return (
        <GlassCard className={cn(
            "group transition-all duration-300 hover:scale-[1.02] border-white/5 relative", 
            isBlocked && "border-red-500/40 opacity-90",
            isBreached && "border-red-500/20 bg-red-500/5",
            isDeleted && "opacity-60 grayscale",
            isTrial && !isDeleted && "border-primary/40 bg-primary/5 shadow-2xl shadow-primary/10"
        )}>
            {isBlocked && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-white uppercase tracking-tighter">Account restricted</p>
                        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-relaxed">Identity check overdue</p>
                    </div>
                    <Button asChild size="sm" className="bg-white text-black hover:bg-gray-200 font-bold uppercase text-[9px] tracking-[0.2em] rounded-full px-6">
                        <Link href="/kyc">Complete KYC now</Link>
                    </Button>
                </div>
            )}

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="min-w-0">
                        <CardTitle className="text-lg text-white font-bold truncate flex items-center gap-2">
                            {account.plan_name}
                            {isTrial && <Badge className="bg-primary text-white text-[8px] h-4 font-bold uppercase border-none">TRIAL</Badge>}
                        </CardTitle>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
                            <Grid3x3 className="w-3 h-3 opacity-50"/> {account.id.substring(0, 8)}
                        </p>
                        {hasGracePeriod && !isBlocked && <GraceTimer expiry={account.grace_period_expiry} />}
                    </div>
                    {!isBlocked && (
                        isDeleted ? (
                            <div className="bg-gray-500/20 text-gray-500 p-2.5 rounded-xl border border-white/5"><Timer className="w-4 h-4"/></div>
                        ) : isBreached ? (
                            <div className="bg-red-500/20 text-red-400 p-2.5 rounded-xl border border-red-500/20"><ShieldAlert className="w-4 h-4"/></div>
                        ) : !paymentApproved ? (
                            <div className="bg-amber-400/20 text-amber-400 p-2.5 rounded-xl border border-amber-400/20 animate-pulse"><Clock className="w-4 h-4"/></div>
                        ) : (
                            <div className="bg-green-500/20 text-green-400 p-2.5 rounded-xl border border-green-500/20"><ShieldCheck className="w-4 h-4"/></div>
                        )
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">Status</p>
                        <p className={cn("text-xs font-bold capitalize mt-2", 
                            isBlocked ? "text-red-500" :
                            isDeleted ? "text-gray-500" :
                            isBreached ? "text-red-400" : 
                            !paymentApproved ? "text-amber-400" : "text-green-400"
                        )}>
                            {isBlocked ? "Restricted" : isDeleted ? "Expired" : isBreached ? "Breached" : !paymentApproved ? "Verifying" : "Active"}
                        </p>
                    </div>
                    <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest leading-none">Model</p>
                        <p className="text-xs font-bold text-white mt-2 capitalize">{isTrial ? 'Trial' : isPtp ? 'PTP' : 'Standard'}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                {isDeleted ? (
                    <Button disabled className="w-full h-11 bg-slate-900 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-700">Session expired</Button>
                ) : !paymentApproved ? (
                    <Button disabled className="w-full h-11 bg-slate-900 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest text-amber-500/80 flex items-center justify-center gap-2">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        Verifying reference
                    </Button>
                ) : (
                    <Button asChild className={cn(
                        "w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]", 
                        isBreached && "bg-slate-800 hover:bg-slate-700",
                        isTrial && "bg-white text-black hover:bg-gray-100 shadow-white/10",
                        isBlocked && "bg-slate-900 text-gray-700 cursor-not-allowed opacity-30"
                    )} disabled={isBlocked}>
                        <Link href={isBlocked ? "#" : `/welcome/dashboard/${account.id}`}>
                            {isBreached ? "View performance" : isTrial ? "Enter trial lab" : "Open dashboard"} <ArrowRight className="ml-2 w-3.5 h-3.5"/>
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </GlassCard>
    );
};

export function AccountsHub({ accounts, profile, onSwitchToGetFunded, onSelectSpecialOffer }: { accounts: any[], profile: any, onSwitchToGetFunded: () => void, onSelectSpecialOffer?: (planId: string, coupon: string) => void }) {
    const kycVerified = profile.kyc_status === 'verified';
    const visibleAccounts = accounts;
    
    const activeCount = visibleAccounts.filter(a => a.status === 'active' && !a.is_blocked).length;
    const pendingCount = visibleAccounts.filter(a => a.status === 'pending' || !a.is_approved).length;
    const blockedCount = visibleAccounts.filter(a => a.is_blocked).length;
    const firstName = profile.full_name?.split(' ')[0] || 'Trader';

    return (
        <div className="space-y-10">
            <GlassCard className="p-8 md:p-12 border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 -z-0"><Trophy className="w-64 h-64 text-primary"/></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                    <UserAvatar />
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Welcome, {firstName}!</h1>
                            <Badge variant="outline" className={cn("border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1", kycVerified ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400")}>{kycVerified ? 'Verified profile' : 'Verification pending'}</Badge>
                        </div>
                        <p className="text-gray-400 font-medium text-lg max-w-lg">Manage all your institutional accounts from one central grid.</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                            <div className="bg-black/60 px-5 py-3 rounded-2xl border border-white/5 flex flex-col gap-1 min-w-[120px]"><span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Active access</span><div className="flex items-center gap-2"><Target className="w-3.5 h-3.5 text-primary"/><span className="text-lg font-black text-white">{activeCount}</span></div></div>
                            <div className="bg-black/60 px-5 py-3 rounded-2xl border border-white/5 flex flex-col gap-1 min-w-[120px]"><span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">In verification</span><div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-500"/><span className="text-lg font-black text-white">{pendingCount}</span></div></div>
                            {blockedCount > 0 && <div className="bg-red-600/10 px-5 py-3 rounded-2xl border border-red-600/20 flex flex-col gap-1 min-w-[120px] animate-pulse"><span className="text-[9px] font-bold text-red-400 uppercase tracking-widest">Blocked</span><div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-red-500"/><span className="text-lg font-black text-red-500">{blockedCount}</span></div></div>}
                            <div className="bg-black/60 px-5 py-3 rounded-2xl border border-white/5 flex flex-col gap-1 min-w-[120px]"><span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Wallet</span><div className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-green-400"/><span className="text-lg font-black text-white">₹{Number(profile.wallet_balance).toLocaleString('en-IN')}</span></div></div>
                        </div>
                    </div>
                    <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
                        <Button onClick={onSwitchToGetFunded} size="lg" className="h-14 px-10 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            Get funded <PlusCircle className="ml-2 w-4 h-4"/>
                        </Button>
                        <Button asChild variant="outline" className="h-11 border-white/10 bg-white/5 text-white font-bold text-[10px] uppercase rounded-xl">
                            <Link href="/guide">Rules & risk</Link>
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* HIGH-IMPACT SPOTLIGHT PROMO BAR */}
            <div className="relative group px-1">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-primary to-purple-600 rounded-[32px] blur-sm opacity-70 animate-pulse"></div>
                
                <div className="relative bg-[#08090a] border border-white/10 rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 overflow-hidden shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 opacity-[0.05] pointer-events-none text-primary">
                        <Trophy className="w-64 h-64" />
                    </div>

                    <div className="flex flex-row md:flex-row items-center gap-6 w-full md:w-auto relative z-10">
                        <div className="shrink-0 flex flex-col items-center justify-center border-2 border-primary/40 rounded-full h-24 w-16 md:h-28 md:w-20 bg-primary/5 shadow-[0_0_20px_rgba(139,44,245,0.2)]">
                            <span className="text-2xl md:text-3xl font-black text-white leading-none">60</span>
                            <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-widest mt-1">% OFF</span>
                        </div>

                        <div className="flex-1 space-y-2 md:space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-red-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-lg border-none animate-flash-urgent">FLASH SALE ENDING</Badge>
                                <div className="flex items-center gap-1 text-amber-500 font-black text-[9px] uppercase tracking-widest">
                                    <Timer className="w-3 h-3" /> LIMITED SLOTS
                                </div>
                            </div>
                            <h3 className="text-xl md:text-4xl font-black text-white uppercase italic leading-tight tracking-tighter">
                                50 LAKH 2-STEP <br className="hidden md:block" /> <span className="text-primary">SPECIAL OFFER</span>
                            </h3>
                            <p className="text-[10px] md:text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                                DISPATCHING CODE <span className="text-white underline decoration-primary decoration-2 underline-offset-4 font-mono text-xs ml-1">NAV60</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-between w-full md:w-auto h-full relative z-10 gap-6 md:gap-4">
                        <div className="text-center md:text-right">
                             <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">FINAL PRICE APPLIED</p>
                             <div className="flex items-baseline gap-2 justify-center md:justify-end">
                                <span className="text-3xl md:text-5xl font-black text-white tracking-tighter">₹14,399</span>
                                <span className="text-sm md:text-lg text-gray-600 line-through font-bold">₹35,999</span>
                            </div>
                        </div>
                        <Button 
                            onClick={() => onSelectSpecialOffer?.('legacy-2s-50l', 'NAV60')} 
                            className="w-full md:w-auto h-14 md:h-16 px-10 rounded-2xl bg-white text-black hover:bg-gray-100 font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all hover:scale-105 active:scale-95 group"
                        >
                            CLAIM 60% SAVING <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6 pt-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Portfolio grid</h2>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Secure session management</p>
                    </div>
                    {!kycVerified && visibleAccounts.length > 0 && (
                        <Link href="/kyc" className="flex items-center gap-2 bg-amber-400/10 text-amber-400 px-4 py-2 rounded-xl border border-amber-400/20 text-[10px] font-bold uppercase tracking-widest animate-in slide-in-from-right-4">
                            <AlertTriangle className="w-3.5 h-3.5 animate-pulse"/> 48-hour KYC grace period active
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleAccounts.length > 0 ? (
                        visibleAccounts.map((acc: any) => <AccountCard key={acc.id} account={acc} kycVerified={kycVerified} />)
                    ) : (
                        <GlassCard className="col-span-full p-20 text-center border-dashed border-white/10 bg-white/[0.01]">
                            <div className="mx-auto h-20 w-20 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mb-8 shadow-2xl">
                                <Activity className="h-10 w-10 text-gray-800" />
                            </div>
                            <div className="space-y-2 mb-10">
                                <h3 className="text-2xl font-bold text-white tracking-tight">Portfolio empty</h3>
                                <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium uppercase tracking-[0.2em]">Start an evaluation to begin your professional career.</p>
                            </div>
                            <Button onClick={onSwitchToGetFunded} size="lg" className="bg-primary text-white font-bold uppercase tracking-widest text-xs px-12 h-14 rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-110">
                                Get funded <ArrowRight className="ml-3 h-5 w-5"/>
                            </Button>
                        </GlassCard>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
