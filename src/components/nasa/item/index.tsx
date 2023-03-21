import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import Body from "components/common/body";
import Heading from "components/common/heading";
import useModal, { Modal } from "components/common/modal/useModal";
import Container from "components/container";
import { NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE } from "constants/images";
import { ExpectedNasaMediaQuerySearchResponse } from "utils/data/useNasaMediaLibrary";
import { Camera, MapPin } from "react-feather";
import { theme } from "utils/theme";
import ImagesRow from "components/common/imagesRow";
import List, { LI } from "components/common/list";
import { getDateString } from "utils/date";
import { uniq } from "lodash";

const NasaItemDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FullWidthDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

const CenteredImageDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 340px; // for very tall images
  overflow: hidden;
`;

type NasaMediaItemProps =
  ExpectedNasaMediaQuerySearchResponse["collection"]["items"][0];

const NasaItem = ({ data, links }: NasaMediaItemProps) => {
  const [mainImage, setMainImage] = useState(
    links?.[0].href || NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE
  );

  if (!data.length) {
    // Expected to filter in the list that renders this component
    return null;
  }

  const {
    title,
    photographer,
    center,
    description,
    keywords,
    date_created,
    location,
  } = data[0];

  const fullScreenImageModal = useModal();

  return (
    <NasaItemDiv>
      <FullWidthDiv>
        <DetailsDiv>
          <Heading level={200}>{title}</Heading>
          <Body>{getDateString(new Date(date_created))}</Body>

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

          <Body margin="30px 0 20px 0">{description}</Body>
        </DetailsDiv>

        <Modal {...fullScreenImageModal} ref={fullScreenImageModal.modalRef}>
          <Image
            src={mainImage || NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE}
            width="0"
            height="0"
            sizes="100vw"
            alt="Nasa Item Image"
            style={{
              height: "auto",
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              objectFit: "cover",
              zIndex: 400,
            }}
          />
        </Modal>
        <CenteredImageDiv>
          <Image
            onClick={() => {
              fullScreenImageModal.openModal();
            }}
            src={mainImage || NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE}
            width="0"
            height="0"
            sizes="100vw"
            alt={title}
            style={{
              height: "auto",
              width: "100%",
              overflow: "scroll",
            }}
            priority
            loading="eager"
          />
        </CenteredImageDiv>

        <ImagesRow
          onImageClick={(src) => {
            const openModal = src === mainImage; // it means someone clicked on it once to make it main, and clicked again
            setMainImage(src);

            if (openModal) {
              fullScreenImageModal.openModal();
            }
          }}
          images={uniq(links.map((link) => link.href))}
        />

        <Heading level={400}>Keywords</Heading>
        <List>
          {keywords?.map((keyword) => (
            <LI>
              <Body>{keyword}</Body>
            </LI>
          ))}
        </List>
      </FullWidthDiv>
    </NasaItemDiv>
  );
};

const NasaItemContainerContainer = (props: NasaMediaItemProps) => {
  const image = props.links?.[0].href || NASA_MEDIA_ITEM_PLACEHOLDER_IMAGE;

  const { title, description } = props.data[0];
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />

        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Container centerContent>
        <NasaItem {...props} />
      </Container>
    </>
  );
};

export default NasaItemContainerContainer;
