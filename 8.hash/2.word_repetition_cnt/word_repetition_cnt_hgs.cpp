#include <iostream>

using namespace std;

using hash_value_type = int;

template <int N>
hash_value_type fast_powmod(hash_value_type n, int m)
{
    if (n == 0)
    {
        return 1;
    }
    if (n == 1)
    {
        return N;
    }
    auto r = fast_powmod<N>(n >> 1, m);
    r = (r * r) % m;
    r = (r + m) % m;
    if (n & 1)
        r = (r * N) % m;
    return r;
}

template <>
hash_value_type fast_powmod<2>(hash_value_type n, int m)
{
    if (n < 30)
    {
        return (1 << n) % m;
    }
    auto r = fast_powmod<2>(n >> 1, m);
    r = (r * r) % m;
    r = (r + m) % m;
    if (n & 1)
        r = (r << 1) % m;
    return r;
}

template <int N>
void update_hash(hash_value_type &h, int c, int m)
{
    h = (h * N) % m;
    h = (h + c) % m;
}

template <>
void update_hash<2>(hash_value_type &h, int c, int m)
{
    h = (h << 1) % m;
    h = (h + c) % m;
}

template <int N>
void update_hash2(hash_value_type &h, int c, int p, int m)
{
    h = h - c * p; // h = h - c * (N^n mod m)
    h = (h % m + m) % m;
}

constexpr auto REMAINDER = 5381;

int count_str(const string &str, const string &target)
{
    int cnt = 0;
    hash_value_type str_hash2 = 0;
    hash_value_type str_hash3 = 0;
    hash_value_type str_hash5 = 0;
    const size_t str_sz = str.size();
    hash_value_type target_hash2 = 0;
    hash_value_type target_hash3 = 0;
    hash_value_type target_hash5 = 0;
    const size_t target_sz = target.size();

    for (auto idx = 0; idx < target_sz - 1; ++idx)
    {
        auto &target_character = target[idx];
        auto &string_character = str[idx];
        update_hash<2>(target_hash2, target_character, REMAINDER);
        update_hash<2>(str_hash2, string_character, REMAINDER);
        update_hash<3>(target_hash3, target_character, REMAINDER);
        update_hash<3>(str_hash3, string_character, REMAINDER);
        update_hash<5>(target_hash5, target_character, REMAINDER);
        update_hash<5>(str_hash5, string_character, REMAINDER);
    }
    auto &last_target_character = target[target_sz - 1];
    update_hash<2>(target_hash2, last_target_character, REMAINDER);
    update_hash<3>(target_hash3, last_target_character, REMAINDER);
    update_hash<5>(target_hash5, last_target_character, REMAINDER);

    auto p2 = fast_powmod<2>(target_sz - 1, REMAINDER);
    auto p3 = fast_powmod<3>(target_sz - 1, REMAINDER);
    auto p5 = fast_powmod<5>(target_sz - 1, REMAINDER);

    for (auto idx = target_sz - 1; idx < str_sz; ++idx)
    {
        auto &string_character = str[idx];
        update_hash<2>(str_hash2, string_character, REMAINDER);
        update_hash<3>(str_hash3, string_character, REMAINDER);
        update_hash<5>(str_hash5, string_character, REMAINDER);
        if (str_hash2 == target_hash2 && str_hash3 == target_hash3 && str_hash5 == target_hash5)
        {
            ++cnt;
        }
        auto& evicted_character = str[idx - target_sz + 1];
        update_hash2<2>(str_hash2, evicted_character, p2, REMAINDER);
        update_hash2<3>(str_hash3, evicted_character, p3, REMAINDER);
        update_hash2<5>(str_hash5, evicted_character, p5, REMAINDER);
    }
    return cnt;
}

char B[500000 + 1], S[100000 + 1];

int main(int argc, char **argv)
{
    int test_case;
    int T, n1, n2;

    std::ios_base::sync_with_stdio(false);
    std::cin.tie(nullptr);
    std::cout.tie(nullptr);

    cin >> T;
    cin.ignore();
    /*
       여러 개의 테스트 케이스가 주어지므로, 각각을 처리합니다.
    */
    for (test_case = 1; test_case <= T; ++test_case)
    {
        cin >> B >> S;
        cout << "#" << test_case << " " << count_str(B, S) << "\n";
    }
    return 0; //정상종료시 반드시 0을 리턴해야합니다.
}