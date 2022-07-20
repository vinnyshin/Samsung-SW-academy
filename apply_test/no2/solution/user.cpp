#include <unordered_map>
#include <map>
#include <set>

using StudentID = int;
using Score = int;
struct Student
{
    Score mScore;
};

static std::unordered_map<StudentID, Student> student_groups[3][2];
static std::map<Score, std::set<StudentID>> score_groups[3][2];

inline std::unordered_map<StudentID, Student> &get_student_group(int grade, const char *gender)
{
    return student_groups[grade - 1][gender[0] == 'f'];
}

inline std::map<Score, std::set<StudentID>> &get_score_group(int grade, const char *gender)
{
    return score_groups[grade - 1][gender[0] == 'f'];
}

void init()
{
    for (auto &student_groups_by_grade : student_groups)
    {
        for (auto &student_group : student_groups_by_grade)
        {
            student_group = std::unordered_map<StudentID, Student>{};
        }
    }
    for (auto &score_groups_by_grade : score_groups)
    {
        for (auto &score_group : score_groups_by_grade)
        {
            score_group = std::map<Score, std::set<StudentID>>{};
        }
    }
}

// O((lg n)^2)
int add(int mId, int mGrade, char mGender[7], int mScore)
{
    auto &student_group = get_student_group(mGrade, mGender);
    auto &score_group = get_score_group(mGrade, mGender);
    student_group[mId] = {mScore};
    score_group[mScore].insert(mId);
    return *score_group.rbegin()->second.rbegin(); // 점수가 가장 높은 학생 중 ID가 가장 큰 값
}

// O((lg n)^2)
int remove(int mId)
{
    for (int grade = 1; grade <= 3; ++grade)
    {
        for (int i = 0; i < 2; ++i)
        {
            auto &student_group = student_groups[grade - 1][i];
            auto it = student_group.find(mId);
            if (it != student_group.end())
            {
                auto &score_group = score_groups[grade - 1][i];
                auto &student = it->second;
                auto &score_set = score_group[student.mScore];
                score_set.erase(mId);
                if (score_set.empty())
                {
                    score_group.erase(student.mScore);
                }
                student_group.erase(it);

                if (student_group.empty())
                    return 0;
                return *score_group.begin()->second.begin();
            }
        }
    }
    return 0;
}

// O((lg n)^2)
int query(int mGradeCnt, int mGrade[], int mGenderCnt, char mGender[][7], int mScore)
{
    const StudentID MAX_STUDENT_ID = 1000000001;
    const Score MAX_SCORE = 300001;

    StudentID result = MAX_STUDENT_ID;
    Score min_score = MAX_SCORE;

    for (int grade_idx = 0; grade_idx < mGradeCnt; ++grade_idx)
    {
        for (int gender_idx = 0; gender_idx < mGenderCnt; ++gender_idx)
        {
            const auto &score_group = get_score_group(mGrade[grade_idx], mGender[gender_idx]);
            auto it = score_group.lower_bound(mScore); // mScore 이상인 성적 그룹
            if (it != score_group.end())
            {
                StudentID id = *it->second.begin();
                Score score = it->first;
                if (min_score > score || min_score == score && result > id)
                {
                    min_score = score;
                    result = id;
                }
            }
        }
    }

    return result == MAX_STUDENT_ID ? 0 : result;
}