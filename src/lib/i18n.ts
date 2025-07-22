import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  AM: {
    translation: {
      backToCategories: "Վերադառնալ կատեգորիաներ",
      chooseCategory: "Ընտրեք կատեգորիա",
      callWaiter: "Կանչել մատուցողին",
      checkPlease: "Խնդրում եմ հաշիվը",
      unknownError: "Անհայտ սխալ",
      failedToFetchCategories: "Չհաջողվեց բեռնել կատեգորիաները",
      failedToFetchItems: "Չհաջողվեց բեռնել մենյուի տարրերը",
      failedToSendRequest: "Հայցը ուղարկելու սխալ",
      items: "Ապրանքներ",
      categories: "Կատեգորիաներ",
    }
  },
  RU: {
    translation: {
      backToCategories: "Назад к категориям",
      chooseCategory: "Выберите категорию",
      callWaiter: "Позвать официанта",
      checkPlease: "Счет, пожалуйста",
      unknownError: "Неизвестная ошибка",
      failedToFetchCategories: "Не удалось загрузить категории",
      failedToFetchItems: "Не удалось загрузить элементы меню",
      failedToSendRequest: "Ошибка отправки запроса",
      items: "Блюда",
      categories: "Категории",
    }
  },
  EN: {
    translation: {
      backToCategories: "Back to categories",
      chooseCategory: "Choose a category",
      callWaiter: "Call Waiter",
      checkPlease: "Check Please",
      unknownError: "Unknown error",
      failedToFetchCategories: "Failed to fetch categories",
      failedToFetchItems: "Failed to fetch menu items",
      failedToSendRequest: "Failed to send request",
      items: "Items",
      categories: "Categories",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "AM",
    interpolation: { escapeValue: false }
  });

export default i18n;
