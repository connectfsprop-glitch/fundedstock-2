'use client';

import { useState, useEffect, useRef, useActionState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { createCoupon, deleteCoupon } from './actions';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
    Loader2, 
    Trash2, 
    Home, 
    Ticket, 
    Wallet, 
    LogOut, 
    Banknote, 
    LineChart, 
    Swords, 
    Users, 
    Newspaper, 
    UserCheck, 
    Package, 
    ShieldCheck, 
    Tag 
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { ClientOnly } from '@/components/ui/client-only';
import { Skeleton } from '@/components/ui/skeleton';
import { FundedStockLogo } from '@/components/ui/logo';
import { signOut } from '@/app/actions';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LEGACY_PLANS } from '@/lib/legacy-plans';

type Coupon = {
  id: number;
  code: string;
  discount_value: number;
  created_at: string;
  restricted_plan_id: string | null;
  restricted_category: string | null;
};

function CreateCouponForm({ plans }: { plans: any[] }) {
    const ref = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [state, formAction] = useActionState(createCoupon, { error: null, success: false });
    const [restrictionType, setRestrictionType] = useState('all');

    useEffect(() => {
        if (state.error) {
            toast({ title: "Error Creating Coupon", description: state.error, variant: "destructive" });
        }
        if (state.success) {
            toast({ title: "Success", description: "Targeted coupon created." });
            ref.current?.reset();
            setRestrictionType('all');
        }
    }, [state, toast]);

    function SubmitButton() {
        const { pending } = useFormStatus();
        return (
            <Button type="submit" disabled={pending} className="w-full h-11 font-bold">
                {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Working...</> : 'Launch Coupon'}
            </Button>
        );
    }

    return (
        <form ref={ref} action={formAction}>
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Tag className="h-5 w-5 text-primary"/> New Targeted Coupon</CardTitle>
                    <CardDescription>Setup a discount code with specific usage rules.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="code" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Coupon Code</Label>
                        <Input id="code" name="code" placeholder="e.g. SPECIAL50" required className="bg-black/40 border-white/10 uppercase font-mono h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount_value" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Discount Percentage (%)</Label>
                        <Input id="discount_value" name="discount_value" type="number" step="1" min="1" max="100" placeholder="e.g. 10" required className="bg-black/40 border-white/10 h-11" />
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Apply To</Label>
                            <Select name="restriction_type" value={restrictionType} onValueChange={setRestrictionType}>
                                <SelectTrigger className="bg-black/40 border-white/10 h-11"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Active Plans</SelectItem>
                                    <SelectItem value="category">Specific Category</SelectItem>
                                    <SelectItem value="plan">One Particular Account</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {restrictionType === 'category' && (
                            <div className="space-y-2 animate-in slide-in-from-top-2">
                                <Label className="text-[10px] font-bold uppercase text-primary">Select Category</Label>
                                <Select name="category" required>
                                    <SelectTrigger className="bg-black/40 border-white/10 h-11"><SelectValue placeholder="Choose Category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="instant">Standard Instant</SelectItem>
                                        <SelectItem value="1-step">1-Step Fast Track</SelectItem>
                                        <SelectItem value="2-step">2-Step Standard</SelectItem>
                                        <SelectItem value="ptp">PassThenPay</SelectItem>
                                        <SelectItem value="pro">Instant Pro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {restrictionType === 'plan' && (
                            <div className="space-y-2 animate-in slide-in-from-top-2">
                                <Label className="text-[10px] font-bold uppercase text-primary">Select Account Size</Label>
                                <Select name="plan_id" required>
                                    <SelectTrigger className="bg-black/40 border-white/10 h-11"><SelectValue placeholder="Choose Plan" /></SelectTrigger>
                                    <SelectContent>
                                        {plans.map(p => (
                                            <SelectItem key={p.id} value={p.id || p.title}>
                                                {p.title} ({p.category.toUpperCase()})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    )
}

function ActiveCouponsList({ coupons, onCouponDelete }: { coupons: Coupon[], onCouponDelete: (id: number) => void }) {
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();

    const handleDelete = async (couponId: number) => {
        setIsPending(true);
        try {
            await deleteCoupon(couponId);
            onCouponDelete(couponId);
            toast({ title: "Coupon purged" });
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle>Active Coupons Ledger</CardTitle>
                <CardDescription>Review and manage all promotional codes.</CardDescription>
            </CardHeader>
            <CardContent>
                {!coupons || coupons.length === 0 ? (
                    <p className="text-muted-foreground text-center py-12 italic">No active codes found.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Scope / Restriction</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map((coupon) => (
                                <TableRow key={coupon.id} className="h-16">
                                    <TableCell className="font-mono font-black text-white">{coupon.code}</TableCell>
                                    <TableCell><Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">{coupon.discount_value}% OFF</Badge></TableCell>
                                    <TableCell>
                                        {coupon.restricted_plan_id ? (
                                            <span className="text-[10px] font-bold text-primary uppercase">Specific Account</span>
                                        ) : coupon.restricted_category ? (
                                            <span className="text-[10px] font-bold text-amber-500 uppercase">Category: {coupon.restricted_category}</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">Universal</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" disabled={isPending} className="text-red-500 hover:text-red-400 hover:bg-red-500/5">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-slate-950 border-white/10 text-white">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Coupon?</AlertDialogTitle>
                                                    <AlertDialogDescription className="text-gray-400">This will immediately deactivate the code <span className="font-bold text-white">{coupon.code}</span> for all traders.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(coupon.id)} className="bg-red-600 text-white">Confirm Purge</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}

export default function CouponsPage() {
    const supabase = createClient();
    const { toast } = useToast();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [dbPlans, setDbPlans] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: cData } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
        const { data: pData } = await supabase.from('plans').select('*').eq('is_active', true);
        
        if (cData) setCoupons(cData);
        if (pData) setDbPlans(pData);
        setIsLoading(false);
    };

    useEffect(() => { fetchData(); }, []);
    
    const allPlansForSelection = useMemo(() => {
        return [...LEGACY_PLANS, ...dbPlans];
    }, [dbPlans]);

    return (
        <SidebarProvider>
            <Sidebar className="border-r border-white/5">
                <SidebarHeader className="border-b border-white/5 p-4 h-[57px] flex items-center bg-slate-900/50">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
                        <FundedStockLogo className="w-8 h-8 text-primary" />
                        <span className="text-white group-[[data-state=collapsed]]:hidden">FundedStock 2.0</span>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="bg-slate-950">
                    <SidebarMenu className="p-2 gap-1">
                        <SidebarMenuItem><SidebarMenuButton href="/admin/dashboard"><Home />Dashboard</SidebarMenuButton></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuButton href="/admin/account-requests"><UserCheck />Account Requests</SidebarMenuButton></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuButton href="/admin/coupons" isActive><Ticket />Coupons</SidebarMenuButton></SidebarMenuItem>
                        <SidebarMenuItem><SidebarMenuButton href="/admin/payment-settings"><Wallet />Settings</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className="border-t border-white/5 p-2 bg-slate-950">
                    <SidebarMenu><SidebarMenuItem><form action={signOut} className="w-full"><SidebarMenuButton asChild><button type="submit" className="w-full text-red-400"><LogOut />Logout</button></SidebarMenuButton></form></SidebarMenuItem></SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset className="bg-slate-950">
                <header className="flex h-[57px] items-center justify-between p-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-4"><SidebarTrigger className="md:hidden" /><h1 className="text-xl font-bold text-white uppercase tracking-tight">Coupon Command</h1></div>
                    <ThemeToggle />
                </header>
                <main className="p-4 md:p-8 bg-muted/40 font-poppins">
                    <ClientOnly>
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                           <div className="lg:col-span-1">
                               <CreateCouponForm plans={allPlansForSelection} />
                           </div>
                           <div className="lg:col-span-2">
                                {isLoading ? <Skeleton className="h-96 w-full bg-white/5 rounded-3xl" /> : <ActiveCouponsList coupons={coupons} onCouponDelete={(id) => setCoupons(c => c.filter(item => item.id !== id))} />}
                           </div>
                       </div>
                   </ClientOnly>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
