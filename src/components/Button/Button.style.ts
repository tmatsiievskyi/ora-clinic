import { cva } from 'cva';

export const buttonStyles = cva(
  'flex flex-row gap-x-4 disabled:cursor-not-allowed items-center justify-center',
  {
    variants: {
      buttonType: {
        base: `select-none transition-all 
          disabled:pointer-events-none disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed`,
        outline:
          'select-none border transition-all disabled:pointer-events-none disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      color: {
        primary: `bg-primary text-bkg-frg hover:bg-primary/90`,
        secondary: `bg-secondary text-secondary-frg hover:bg-secondary/90`,
        light: `bg-light text-light-frg hover:bg-light/90`,
        dark: `bg-dark text-dark-frg hover:bg-dark/90`,
        destructive: `bg-destructive text-destructive-frg hover:bg-destructive/90`,
        success: `bg-success text-success-frg hover:bg-success/90`,
        bkg: `bg-bkg text-bkg-frg hover:bg-bkg/90`,
        'bkg-sec': `bg-bkg-sec text-bkg-sec-frg hover:bg-bkg-sec/90`,
      },
      size: {
        default: ['text-base'],
        small: ['text-sm'],
        large: ['text-lg'],
        xxl: ['text-2xl'],
      },
      spacing: {
        default: ['py-2', 'px-4'],
        small: ['py-1', 'px-2'],
        large: ['py-3', 'px-6'],
        xxl: ['py-4', 'px-8'],
      },
      rounded: {
        default: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        xxl: 'rounded-2xl',
        none: 'rounded-none',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        buttonType: 'base',
        size: 'default',
        spacing: 'default',
        rounded: 'default',
      },
    ],
    defaultVariants: {
      buttonType: 'base',
      size: 'default',
      rounded: 'default',
      spacing: 'default',
    },
  },
);
