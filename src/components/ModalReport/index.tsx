import { getReportCategoryList, sendReport } from "@apis/reports";
import Modal from "@components/Modal";
import { auth } from "@utils/firebase";
import { useEffect, useState } from "react";
import { Report, ReportCategory } from "src/@types/report";

type ModalReportProps = {
  isOpenReportModal: boolean;
  onClose: () => void;
  selectedDesignId: string;
};

export default function ModalReport(props: ModalReportProps) {
  const { isOpenReportModal, onClose, selectedDesignId } = props;

  const [categoryList, setCategoryList] = useState<ReportCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    if (!isOpenReportModal) return;
    getReportCategoryList()
      .then((res) => {
        const categoryList = res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as ReportCategory;
        });
        setCategoryList(categoryList);
      })
      .catch((err) => console.log(err));
  }, [isOpenReportModal]);

  const requestReport = () => {
    if (!auth.currentUser) {
      alert(
        "로그인 후 이용해주세요. 신고 내용은 저장되지 않으니, 복사 후 붙여넣기 하시면 더욱 편리합니다."
      );
      return;
    }

    if (!selectedCategory) {
      alert("신고 카테고리를 선택해주세요.");
      return;
    }

    if (!reportReason) {
      alert("신고 내용을 입력해주세요.");
      return;
    }

    const report: Report = {
      categoryId: selectedCategory,
      reason: reportReason,
      type: "design",
      userId: auth.currentUser.uid,
      targetId: selectedDesignId,
      createdDate: new Date(),
    };

    sendReport(report)
      .then(() => {
        alert("신고가 접수되었습니다.");
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={isOpenReportModal}
      title="신고하기"
      onClose={onClose}
      onClickConfirm={requestReport}
      onClickCancel={onClose}
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="category">신고 카테고리</label>
        <select
          className="w-full p-2 border border-gray-300 rounded focus:ring-[#ff4d4d]"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value={""} hidden>
            신고 카테고리를 선택해주세요.
          </option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="report">신고 내용</label>
        <textarea
          name="report"
          id="report"
          cols={30}
          rows={10}
          className="w-full p-2 border border-gray-300 rounded focus:ring-[#ff4d4d]"
          onChange={(e) => setReportReason(e.target.value)}
        />
      </div>
    </Modal>
  );
}
