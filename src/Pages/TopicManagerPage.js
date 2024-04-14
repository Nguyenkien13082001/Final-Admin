import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import TopicManager from "../components/TopicManager/TopicManager";

export default function TopicManagerPage() {
  return (
    <LayoutHome>
      <div>
        <TopicManager />
      </div>
    </LayoutHome>
  );
}
