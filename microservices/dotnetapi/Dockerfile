###############################################################
# Builder
###############################################################
FROM mcr.microsoft.com/dotnet/sdk:5.0

WORKDIR /build

COPY src .

RUN RID="unknown" && \
    case "$(uname -m)" in \
        *x86_64*)  RID=linux-x64;; \
    esac \
    && dotnet publish -c Release --self-contained -r ${RID} \
    && mv /src/bin/Release/net5.0/${RID}/publish .

###############################################################
# Runner
###############################################################
FROM debian:buster
RUN apt-get update \
    && apt-get install -y -qqq libicu63 \
    && rm -rf /var/lib/apt/lists/*

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_DETAILEDERRORS=1
ENV ASPNETCORE_SHUTDOWNTIMEOUTSECONDS=3

WORKDIR /root/
EXPOSE 8080
COPY --from=0 /build/publish .

CMD ["./dotnetapi"]
