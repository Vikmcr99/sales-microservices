FROM azul/zulu-openjdk:17
EXPOSE 8081
COPY target/product-api-1.0.0.jar product-api-1.0.0.jar
WORKDIR .

ENTRYPOINT ["java", "-jar", "./product-api-1.0.0.jar", "--server.port=8081"]
