import React from "react";
import styled from "styled-components";
import Container from "components/container";
import PublicLayout from "components/layouts/Public";
import { NOT_FOUND_IMAGE } from "constants/images";
import Title from "components/common/title";
import Image, { ImageType } from "components/common/image";

const FullWidthDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
`;

const NotFound = () => {
  return (
    <PublicLayout title="Page Not Found">
      <Container centerContent py="20px" pylg="20px">
        <FullWidthDiv>
          <Title margin="15px 0 15px 40px">Page not found</Title>
        </FullWidthDiv>
        <Image
          alt="Blog Image"
          type={ImageType.NORMAL_IMAGE}
          src={NOT_FOUND_IMAGE}
        />
      </Container>
    </PublicLayout>
  );
};

export default NotFound;
