###############################################################
# Builder
###############################################################
FROM openjdk:11-jdk-buster

WORKDIR /build

COPY src .

RUN ./gradlew build

###############################################################
# Runner
###############################################################
FROM openjdk:11-jre-buster

ENV PORT=8080

WORKDIR /

EXPOSE 8080
COPY --from=0 /build/build/libs/src.jar .

CMD ["java", "-jar", "./src.jar"]
