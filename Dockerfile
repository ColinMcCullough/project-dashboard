FROM node:12
ARG NPM_TOKEN
ENV BROWSER_URL=stratypus.tk
ARG CLOUDINARY_NAME
ARG CLOUDINARY_SECRET
ARG CLOUDINARY_KEY
# ENV CLOUDINARY_NAME=${CLOUDINARY_NAME}
# ENV CLOUDINARY_SECRET=${CLOUDINARY_SECRET}
# ENV CLOUDINARY_KEY=${CLOUDINARY_KEY}

RUN mkdir -p /usr/src/opex
WORKDIR /usr/src/opex
COPY . /usr/src/opex
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
RUN npm install
RUN rm -f .npmrc
RUN npm run build

ENV PORT=8083
ENV HOST=0.0.0.0
EXPOSE ${PORT}
CMD [ "npm", "start" ]
