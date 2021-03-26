FROM mariadb

# Set env vars
ENV MYSQL_ROOT_PASSWORD thecakeisalive
ENV MYSQL_DATABASE dumpster

# Prevent UTF-8 problems
# (had issues with "ByÃ¥sen senter" and the like)
RUN echo "LC_ALL=en_US.UTF-8" >> /etc/environment
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN echo "LANG=en_US.UTF-8" > /etc/locale.conf
RUN apt-get update
# A little restrictive here (see https://serverfault.com/a/839563)
RUN apt-get --yes -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" upgrade
RUN apt-get install -y locales
RUN locale-gen en_US.UTF-8

# Copy scripts
COPY . /usr/src/
WORKDIR /usr/src/
