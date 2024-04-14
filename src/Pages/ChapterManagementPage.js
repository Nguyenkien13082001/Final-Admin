import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import ChapterManagement from "../components/ChapterManagement/ChapterManagement";

export default function ChapterManagementPage() {
  return (
    <LayoutHome>
      <div>
        <ChapterManagement></ChapterManagement>
      </div>
    </LayoutHome>
  );
}
