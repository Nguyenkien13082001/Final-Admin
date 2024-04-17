import apiClient from "./apiClient";

const getClasses = async () => {
  const response = await apiClient.get("/api/get_class_admin");
  // console.log("response", response.classes);
  return response.classes;
};

const getChapter = async (class_id) => {
  const response = await apiClient.get(
    `/api/get_chapter_admin?class_id=${class_id}`
  );
  return response.chapters;
};

const getTopic = async (chapter_id) => {
  const response = await apiClient.get(
    `/api/get_topic_admin?chapter_id=${chapter_id}`
  );
  return response.topics;
};

const getQuestions = async () => {
  const response = await apiClient.get(`/api/get_all_question_admin`);
  console.log("response", response.questions);
  return response.questions;
};

const getClassesCount = async () => {
  const response = await apiClient.get(`/api/count_question_by_class_admin`);
  return response;
};

const getChaptersCount = async (class_id) => {
  const response = await apiClient.get(
    `/api/count_question_by_chapter_admin?class_id=${class_id}`
  );
  return response;
};

const getTopicsCount = async (chapter_id) => {
  const response = await apiClient.get(
    `/api/count_question_by_topic_admin?chapter_id=${chapter_id}`
  );
  return response;
};

export {
  getClasses,
  getQuestions,
  getChapter,
  getTopic,
  getClassesCount,
  getChaptersCount,
  getTopicsCount,
};
