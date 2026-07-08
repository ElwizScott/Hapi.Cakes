import { useTranslation } from "react-i18next";

export default function useAppTranslation(namespaces = ["common"]) {
  return useTranslation(Array.isArray(namespaces) ? namespaces : [namespaces]);
}