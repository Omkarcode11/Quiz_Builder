import { useEffect, useState } from "react";
import QuizRow from "../row/QuizRow";
import classes from "./QuizeTable.module.css";
import ConfirmDeleteModal from "../../delete/ConfirmDeleteModal";
import Modal from "../../modal/Modal";
import useApiClient from "../../../hooks/useApiClient";
import QuestionAnswerForm from "../../form/questionAnswerForm/QuestionAnswerForm";
import { Options } from "../../../Types/Quize";
import { formatDate } from "../../../utils/formate";
import ShimmerTable from "../../shimmer/quizTable/ShimmerTable";

type Quizzes = {
  _id: string;
  quizName: string;
  impression: number;
  createdAt: string;
};

type Props = {};

function QuizTable({}: Props) {
  let { getQuestion } = useApiClient();
  let [loading, setLoading] = useState(false);
  let [quizzes, setQuizzes] = useState<Quizzes[]>([]);
  let [questions, setQuestions] = useState<Options[]>([]);
  let [selectedId, setSelectedId] = useState<string | null>(null);
  let { getMyQuizzes, deleteQuiz } = useApiClient();
  let [showDelete, setShowDelete] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);
  let [editQuizType, setEditQuizType] = useState<"QA" | "POLL">("QA");

  function onClose() {
    setShowDelete((_) => false);
    setSelectedId((_) => null);
  }

  function closeUpdateModal() {
    setShowUpdate((_) => false);
    setSelectedId((_) => null);
  }

  async function getAndSetQuestion(id: string) {
    // if (selectedId) {
    let data = await getQuestion(id);

    if (data) {
      setQuestions(() => data.questions);
      setShowUpdate((_) => true);
      setEditQuizType(() => data.typeOfQuiz);
    }
 
  }

  async function openUpdateModal(id: string) {
    console.log("edit click");
    setSelectedId((_) => id);
    await getAndSetQuestion(id);
  }

  function show(id: string) {
    setShowDelete((_) => true);
    setSelectedId((_) => id);
  }

  async function deleteQuizHandler() {
    if (selectedId != null) {
      let res = await deleteQuiz(selectedId);
      onClose();
      if (res) {
        setQuizzes((prev) => {
          let newQuizzes = [...prev];
          return newQuizzes.filter((ele) => ele._id != selectedId);
        });
        setSelectedId((_) => null);
      }
    }
  }

  async function getAndSetQuizzes() {
    let data = await getMyQuizzes();
    setQuizzes((_) => data);
    setLoading((_) => false);
  }

  useEffect(() => {
    setLoading((_) => true);
    getAndSetQuizzes();
  }, []);
  console.log(loading);
  return (
    <>
      <div className={classes.container}>
        {!loading ? (
          <div>
            <table className={classes.tableContainer}>
              <tr className={classes.headers}>
                <th className={classes.radiusStart}>S.No</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th></th>
                <th className={classes.radiusEnd}></th>
              </tr>
              {quizzes.map((ele, i) => (
                <QuizRow
                  showDelete={show}
                  num={i + 1}
                  createdOn={formatDate(ele.createdAt)}
                  impressions={ele.impression}
                  id={ele._id}
                  quizName={ele.quizName}
                  openUpdate={openUpdateModal}
                />
              ))}
            </table>
          </div>
        ) : (
          <ShimmerTable columns={1} rows={10} />
        )}
        {showUpdate && selectedId && (
          <Modal onClose={closeUpdateModal} show={showUpdate}>
            <QuestionAnswerForm
              setGeneratedLink={(id:string)=>{id}}
              id={selectedId}
              onClose={closeUpdateModal}
              quizName=""
              quizType={editQuizType}
              showSuccessModal={() => {}}
              questions={questions}
              setQuestions={setQuestions}
              state="UPDATE"
            />
          </Modal>
        )}
        {showDelete && (
          <Modal onClose={onClose} show={showDelete}>
            <ConfirmDeleteModal
              quizDelete={deleteQuizHandler}
              cancel={onClose}
            />
          </Modal>
        )}
      </div>
      {quizzes.length > 10 && <p>scroll down for more</p>}
    </>
  );
}

export default QuizTable;
