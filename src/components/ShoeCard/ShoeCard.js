import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' && (<SaleBadge data-variant={variant}>Sale</SaleBadge>)}
          {variant === 'new-release' && (<NewRelease data-variant={variant}>Just Released</NewRelease>)}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
              '--color':
                variant === 'on-sale' ? COLORS.gray[700] : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined,
            }}>{formatPrice(price)}</Price>
        </Row>
        <Spacer size={3} />
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (<SalePrice>{formatPrice(salePrice)}</SalePrice>) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex:1 1 340px;
`;

const Wrapper = styled.article`
  
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius:16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display:flex;
  justify-content:space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const SalePrice = styled.span`
  color: ${COLORS.primary};
  font-weight: ${WEIGHTS.medium};
 
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const Badge = styled.span`
   font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  position:absolute;
  right:-4px;
  top:12px;
  width:fit-content;
  line-height: 32px;
padding: 0 10px;
font-size: ${14 / 18}rem;
  border-radius: 2px;
`;

const SaleBadge = styled(Badge)`
  background-color: ${COLORS.primary};
`;

const NewRelease = styled(Badge)`
 background-color: ${COLORS.secondary};
`;

export default ShoeCard;


/*
you can use data attributes to style the badge
&[data-variant='on-sale'] {
  background-color: ${COLORS.primary};
}

&[data-variant='on-sale']::before {
  content:"Sale";
}

&[data-variant='new-release'] {
  background-color: ${COLORS.secondary};
}
&[data-variant='new-release']::before {
  content:"Just Released!";
} */
