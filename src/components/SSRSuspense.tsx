import { ComponentProps, Suspense } from 'react';

export default function SSRSuspense(props: ComponentProps<typeof Suspense>) {
  if (typeof window === 'undefined') {
    <>{props.fallback}</>;
  }

  return <Suspense {...props} />;
}
