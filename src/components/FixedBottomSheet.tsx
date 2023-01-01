import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import { COLOR } from '../themes/color';
import { px } from '../utils/css';
import Layout from './Layout';
import SSRSuspense from './SSRSuspense';

interface Props {
  children: ReactNode;
}

const setPaddingBottomToBodyTag = (size: number) => {
  document.body.style.marginBottom = px(size);
};

const getContentBoundingRect = () => {
  return document.querySelector('#__next')?.getBoundingClientRect();
};

const FixedBottomSheet = ({ children }: Props) => {
  const bottomSheetRef = useRef<HTMLElement>(null);

  const calculateBottomSheetBoundingRect = () => {
    if (!bottomSheetRef.current) return;

    const bottomSheetBoundingRect = bottomSheetRef.current.getBoundingClientRect();
    return bottomSheetBoundingRect;
  };

  const contentBox = useResizeObserver({
    ref: typeof window === 'undefined' ? null : document.querySelector('#__next'),
  });

  useEffect(() => {
    const bottomSheetBoundingRect = calculateBottomSheetBoundingRect();
    const contentBoundingRect = getContentBoundingRect();

    if (bottomSheetBoundingRect != null && contentBoundingRect != null) {
      const isIntersecting = contentBoundingRect.bottom > bottomSheetBoundingRect.top;

      if (isIntersecting) {
        setPaddingBottomToBodyTag(bottomSheetBoundingRect.height);
      }
    }

    return () => setPaddingBottomToBodyTag(0);
  }, [contentBox.height]);

  return (
    <Layout
      ref={bottomSheetRef}
      css={css`
        position: fixed;
        bottom: 0;
        transform: translateX(-16px);
      `}
    >
      <Wrapper>{children}</Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 24px 16px 24px 16px;
  border-radius: 16px 16px 0px 0px;
  font-size: 16px;
  max-height: 370px;
  background-color: ${COLOR.GREY7};
`;

export default FixedBottomSheet;
