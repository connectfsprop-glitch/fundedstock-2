
'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function createCoupon(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;
  const discountValue = formData.get('discount_value') as string;
  const restrictionType = formData.get('restriction_type') as 'all' | 'category' | 'plan';
  const planId = formData.get('plan_id') as string | null;
  const category = formData.get('category') as string | null;

  if (!code || !discountValue) {
    return { error: 'Coupon code and discount percentage are required.', success: false };
  }
  
  const discount = parseFloat(discountValue);
  if (isNaN(discount) || discount <= 0 || discount > 100) {
      return { error: 'Discount percentage must be between 1 and 100.', success: false };
  }

  const insertData: any = {
    code: code.toUpperCase().trim(),
    discount_value: discount,
    restricted_plan_id: restrictionType === 'plan' ? planId : null,
    restricted_category: restrictionType === 'category' ? category : null
  };

  const { error } = await supabaseAdmin
    .from('coupons')
    .insert(insertData);

  if (error) {
    console.error('Error creating coupon:', error);
    if (error.code === '23505') {
        return { error: 'This coupon code already exists.', success: false };
    }
    return { error: `Failed to create coupon: ${error.message}`, success: false };
  }

  revalidatePath('/admin/coupons');
  return { success: true, error: null };
}

export async function deleteCoupon(couponId: number) {
  if (!couponId) {
    throw new Error('Coupon ID is required.');
  }

  const { error } = await supabaseAdmin
    .from('coupons')
    .delete()
    .eq('id', couponId);

  if (error) {
    console.error('Error deleting coupon:', error);
    throw new Error(`Failed to delete coupon: ${error.message}`);
  }
  
  revalidatePath('/admin/coupons');
}
