ARG NODE_VERSION=18.14.0
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build
ARG VITE_DELAY_SERVICE_HOST
ARG VITE_INITAPI_SERVICE_HOST
ARG VITE_SENDER_SERVICE_HOST
ARG VITE_LINK_TO_EARTH_HOST
ARG VITE_LINK_TO_MARS_HOST
ARG VITE_LINK_TO_INIT_HOST
ENV VITE_DELAY_SERVICE_HOST=${VITE_DELAY_SERVICE_HOST}
ENV VITE_INITAPI_SERVICE_HOST=${VITE_INITAPI_SERVICE_HOST}
ENV VITE_SENDER_SERVICE_HOST=${VITE_SENDER_SERVICE_HOST}
ENV VITE_LINK_TO_EARTH_HOST=${VITE_LINK_TO_EARTH_HOST}
ENV VITE_LINK_TO_MARS_HOST=${VITE_LINK_TO_MARS_HOST}
ENV VITE_LINK_TO_INIT_HOST=${VITE_LINK_TO_INIT_HOST}
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM nginx as final

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80