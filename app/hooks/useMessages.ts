"use client";

import { useI18n } from "@/app/hooks/useI18n";

export const useMessages = () => {
  const { translate } = useI18n();

  return {
    emptyUrl: translate("Validations.emptyUrl"),
    invalidUrl: translate("Validations.invalidUrl"),
    validDomain: translate("Validations.validDomain"),
    domainExtension: translate("Validations.domainExtension"),
    extension: translate("Validations.extension"),
  };
};
