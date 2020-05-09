FROM openjdk:8-jdk-alpine

MAINTAINER Jonas Hecht

VOLUME /tmp

# Add Spring Boot app.jar to Container
ADD "target/serviceRegistration-0.0.1-SNAPSHOT.war" app.jar

ENV JAVA_OPTS=""

# Fire up our Spring Boot app by default
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]