FROM nginx:mainline-alpine

ARG DOMAIN_NAME

COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s/example.com/$DOMAIN_NAME/g" /etc/nginx/nginx.conf

# (just replicating the exact same CMD as the original image)
CMD ["nginx", "-g", "daemon off;"]
