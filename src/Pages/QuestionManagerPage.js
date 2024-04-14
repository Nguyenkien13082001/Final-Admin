import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import QuestionManager from "../components/QuestionManager/QuestionManager";

export default function QuestionManagerPage() {
  return (
    <LayoutHome>
      <div>
        <QuestionManager />
      </div>
    </LayoutHome>
  );
}
