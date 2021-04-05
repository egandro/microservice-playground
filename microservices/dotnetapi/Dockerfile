###############################################################
# Builder
###############################################################
FROM mcr.microsoft.com/dotnet/sdk:5.0

WORKDIR /build

COPY src .

RUN RID="unknown" && \
    case "$(uname -m)" in \
        *x86_64*)   RID=linux-x64;; \
        *armv7l*)   RID=linux-arm;; \
        *aarch64*)  RID=linux-arm64;; \
    esac \
    && dotnet publish -c Release --self-contained -r ${RID} \
    && mv bin/Release/net5.0/${RID}/publish .

###############################################################
# Runner
###############################################################
FROM debian:buster

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_DETAILEDERRORS=1
ENV ASPNETCORE_SHUTDOWNTIMEOUTSECONDS=3

RUN apt-get update \
    && apt-get install -y -qqq libicu63 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root/
EXPOSE 8080
COPY --from=0 /build/publish .

CMD ["./dotnetapi"]
