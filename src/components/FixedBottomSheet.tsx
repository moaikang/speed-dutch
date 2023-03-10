import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode, useEffect, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import { BOTTOM_SHEET_ID } from '../themes/BottomSheet';
import { COLOR } from '../themes/color';
import { px } from '../utils/css';
import Layout from './Layout';

interface Props {
  children: ReactNode;
  takeSpace?: boolean;
}

const setPaddingBottomToBodyTag = (size: number) => {
  document.body.style.marginBottom = px(size);
};

const getContentBoundingRect = () => {
  return document.querySelector('#__next')?.getBoundingClientRect();
};

const FixedBottomSheet = ({ children, takeSpace = true }: Props) => {
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
    if (!takeSpace) return;

    const bottomSheetBoundingRect = calculateBottomSheetBoundingRect();
    const contentBoundingRect = getContentBoundingRect();

    if (bottomSheetBoundingRect != null && contentBoundingRect != null) {
      const isIntersecting = contentBoundingRect.bottom > bottomSheetBoundingRect.top;

      if (isIntersecting) {
        const space = contentBoundingRect.bottom - bottomSheetBoundingRect.top;
        setPaddingBottomToBodyTag(space);
      }
    }

    return () => {
      if (!takeSpace) return;
      setPaddingBottomToBodyTag(0);
    };
  }, [contentBox.height, takeSpace]);

  return (
    <Layout
      id={BOTTOM_SHEET_ID}
      ref={bottomSheetRef}
      css={css`
        position: fixed;
        bottom: 0;
        padding: 0;
        width: 100vw;
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
