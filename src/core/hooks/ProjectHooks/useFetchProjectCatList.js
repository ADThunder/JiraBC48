import { useEffect } from "react";
import { projectCategoryActions } from "../../redux/slice/projectCategorySlice";
import PROJECT_SERVICE from "../../services/projectServ";

export const useFetchProjectCatList = (dispatch) => {
  useEffect(() => {
    PROJECT_SERVICE.getAllProjectCategory()
      .then((res) => {
        dispatch(projectCategoryActions.getAllProjectCategory(res.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
};
