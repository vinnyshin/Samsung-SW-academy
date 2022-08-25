// 참고: https://jackpot53.tistory.com/111
// 음수 모듈러 연산 참고: https://www.crocus.co.kr/1231
#include <iostream>
#include <string.h>

using namespace std;

constexpr int DIV = 100003;
constexpr int RADIX1 = 26;
constexpr int RADIX2 = 27;

template<int RADIX>
void hash_function(int& hash, int charactor) {
    hash = (hash * RADIX) % DIV;
    hash = (hash + charactor) % DIV;
}

template<int RADIX>
void hash_update(int& hash, int curr, int end, int radix_modular) {
    // 미리 계산된 radix^(m-1) % DIV == radix_modular 활용
    // DIV로 나눠진 값들끼리의 뺄셈이기에 모듈러 연산 필요 없음
    hash = hash - (curr * radix_modular);
    
    // 음수의 경우 음수 모듈러 처리로 DIV 더해주기
    if (hash < 0) {
        hash = hash % DIV + DIV;
    }
    
    hash = (hash * RADIX) % DIV;
    hash = (hash + end) % DIV;
}


int main(int argc, char** argv)
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

	int test_case, T;
    string book, word, sub;
    int sub_hash_radix_1, word_hash_radix_1, sub_hash_radix_2, word_hash_radix_2;
    size_t word_size, book_size, dup_cnt, radix1_modular, radix2_modular;

    freopen("sample_input.txt", "r", stdin);
	cin >> T;
	
	for(test_case = 1; test_case <= T; ++test_case) {
        cin >> book >> word;
        
        dup_cnt = 0;
        word_size = word.size();
        book_size = book.size();
        
        sub = book.substr(0, word_size);

        sub_hash_radix_1 = 0;
        word_hash_radix_1 = 0;
        sub_hash_radix_2 = 0;
        word_hash_radix_2 = 0;

        radix1_modular = 1;
        radix2_modular = 1;

        for (size_t i = 0; i < word_size; ++i) {
            hash_function<RADIX1>(sub_hash_radix_1, sub[i]);
            hash_function<RADIX1>(word_hash_radix_1, word[i]);
            hash_function<RADIX2>(sub_hash_radix_2, sub[i]);
            hash_function<RADIX2>(word_hash_radix_2, word[i]);
        }
        
        // radix^(m-1) % DIV 미리 계산
        for (size_t i = 0; i < word_size - 1; ++i) {
            radix1_modular = (RADIX1 * radix1_modular) % DIV;
            radix2_modular = (RADIX2 * radix2_modular) % DIV;
        }

        size_t end, book_curr, book_end;
        for (size_t curr = 0; curr < book_size - word_size + 1; ++curr) {
            end = curr + word_size;
            
            if (sub_hash_radix_1 == word_hash_radix_1 && sub_hash_radix_2 == word_hash_radix_2) {
                ++dup_cnt;
            }
            
            book_curr = book[curr];
            book_end = book[end];

            hash_update<RADIX1>(sub_hash_radix_1, book_curr, book_end, radix1_modular);
            hash_update<RADIX2>(sub_hash_radix_2, book_curr, book_end, radix2_modular);
        }
        
        cout << '#' << test_case << ' ' << dup_cnt << endl;
	}
	return 0;
}

