import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import ClassManager from "../components/Classmanager/ClassManager";

export default function ClassManagerPage() {
  return (
    <LayoutHome>
      <div>
        <ClassManager></ClassManager>
      </div>
    </LayoutHome>
  );
}
