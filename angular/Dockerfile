### Stage 1: build ###

FROM node:14.17.5 as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY documentsUI/package.json documentsUI/package-lock.json /app/documentsUI/

# Install app dependencies.
RUN npm install --prefix documentsUI

# Copy app files.
COPY . /app

# Default build configuration.
ARG configuration=development

# Build app
RUN npm run build --prefix documentsUI -- --output-path=./dist/out --configuration $configuration


### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/documentsUI/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
