import React from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import Title from "components/common/title";
import Link from "components/common/link";
import FadeIn from "components/common/transitions/FadeIn";
import { makeNasaMediaUrl } from "constants/urls";
import { mq } from "utils/responsive";
import { theme } from "utils/theme";
import { ExpectedNasaMediaQuerySearchResponse } from "utils/data/useNasaMediaLibrary";
import { NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE } from "constants/images";
import { MapPin, Camera } from "react-feather";
import Body from "components/common/body";
import Image, { ImageType } from "components/common/image";

const NasaMediaItemLi = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;
  padding: 8px;

  background-color: ${theme.colors.white};

  &: hover {
    box-shadow: 0px 0px 12px 1px ${theme.colors.gray100};
    background-color: ${theme.colors.gray100};
  }

  &: not(: last-child) {
    margin-bottom: 50px;
  }
`;

const InnerDiv = styled.div`
  padding-bottom: 10px;
  width: 100%;
`;

const PreviewImageDiv = styled.div`
  height: 250px;
  max-height: 250px;
  ${mq.ltsm`
    height: 200px;
    max-height: 200px;
  `}

  overflow: hidden;
  border-radius: 8px 8px 0 0;
`;

const ResponsiveDetailsBox = styled.div`
  padding: 0 40px;

  ${mq.ltsm`
    padding: 0 10px;
  `}
`;

const LocationPhotographerDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

type NasaMediaListItemProps =
  ExpectedNasaMediaQuerySearchResponse["collection"]["items"][0];

const NasaMediaListItem = ({ data, links }: NasaMediaListItemProps) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  if (!data.length) {
    // Expected to filter in the list that renders this component
    return null;
  }

  const { nasa_id, title, photographer, center, location } = data[0];

  const innerPart = (
    <InnerDiv>
      <PreviewImageDiv>
        <Image
          alt={title}
          type={ImageType.NORMAL_IMAGE}
          src={links?.[0].href || NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE}
          center
        />
      </PreviewImageDiv>
      <ResponsiveDetailsBox>
        <Title margin="15px 0">{title}</Title>

        <LocationPhotographerDiv>
          <Body margin="10px 0 0 0">
            <MapPin size={15} color={theme.customColors.secondary} />
            &nbsp;
            {center || location}
          </Body>
          {photographer && (
            <Body margin="10px 0 0 0">
              <Camera size={15} color={theme.customColors.secondary} />
              &nbsp;
              {photographer}
            </Body>
          )}
        </LocationPhotographerDiv>
      </ResponsiveDetailsBox>
    </InnerDiv>
  );

  return (
    <FadeIn inView={inView}>
      <NasaMediaItemLi ref={ref} key={nasa_id}>
        <Link href={makeNasaMediaUrl(nasa_id)} key={nasa_id} stretchParent>
          {innerPart}
        </Link>
      </NasaMediaItemLi>
    </FadeIn>
  );
};

export default NasaMediaListItem;
