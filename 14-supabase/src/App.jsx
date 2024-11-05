import { useEffect, useState } from 'react';
import './App.css';
import supabase from './supabaseConfig';

function App() {
  // 사용자 입력 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입/로그인 모드 전환용

  // 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 메시지 표시 함수
  const showMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => setMessage({ type: '', content: '' }), 3000);
  };

  // 1. 회원 가입 함수
  const signUp = async (e) => {
    e.preventDefault();

    // 입력 검증
    if (formData.password !== formData.confirmPassword) {
      showMessage('error', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      showMessage('success', `회원가입 성공! 이메일 인증을 확인해주세요.`);
      console.log('회원가입 성공:', data);

      // 폼 초기화
      setFormData({ email: '', password: '', confirmPassword: '' });
      setIsSignUp(false); // 로그인 모드로 전환
    } catch (error) {
      showMessage('error', `회원가입 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 2. 로그인 함수
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      setUser(data.user);
      showMessage('success', '로그인 성공!');
      // 폼 초기화
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      showMessage('error', `로그인 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. 회원 정보 조회
  const getUserInfo = async () => {
    setLoading(true);

    try {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      if (!currentUser) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      // 세션 정보도 함께 가져오기
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      // 사용자 정보 업데이트
      setUser({
        ...currentUser,
        last_sign_in_at: session?.last_sign_in_at || currentUser.last_sign_in_at,
        created_at: currentUser.created_at,
      });

      showMessage('success', '회원정보를 성공적으로 새로고침했습니다.');
    } catch (error) {
      showMessage('error', `회원정보 조회 실패: ${error.message}`);
      console.error('회원정보 조회 에러:', error.message);

      // 심각한 오류인 경우 (예: 토큰 만료) 로그아웃 처리
      if (error.message.includes('token') || error.message.includes('JWT')) {
        await logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. 회원 정보 수정
  const updateUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      setUser(data.user);
      showMessage('success', '회원정보 수정 성공');
      // 폼 초기화
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      showMessage('error', `회원정보 수정 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 5. 로그아웃
  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      showMessage('success', '로그아웃 성공');
    } catch (error) {
      showMessage('error', `로그아웃 실패: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="container">
      {/* 로딩 인디케이터 */}
      {loading && <div className="loading">처리중...</div>}

      {/* 메시지 표시 */}
      {message.content && <div className={`message ${message.type}`}>{message.content}</div>}

      {/* 현재 로그인된 사용자 정보 표시 */}
      {user && (
        <div className="user-info">
          <h3>현재 로그인된 사용자</h3>
          <p>이메일: {user.email}</p>
          <p>마지막 로그인: {new Date(user.last_sign_in_at).toLocaleString()}</p>
          <p>계정 생성일: {new Date(user.created_at).toLocaleString()}</p>
          <div className="user-actions">
            <button onClick={getUserInfo} className="info-button" disabled={loading}>
              회원정보 새로고침
            </button>
            <button onClick={logout} className="logout-button" disabled={loading}>
              로그아웃
            </button>
          </div>
        </div>
      )}

      {/* 인증 폼 */}
      {!user && (
        <div className="auth-form-container w-[360px]">
          <div className="auth-mode-toggle">
            <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>
              로그인
            </button>
            <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>
              회원가입
            </button>
          </div>

          <form onSubmit={isSignUp ? signUp : login} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="비밀번호를 입력하세요"
                minLength={6}
              />
            </div>

            {isSignUp && (
              <div className="form-group w-[360px]">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="비밀번호를 다시 입력하세요"
                  minLength={6}
                />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {isSignUp ? '회원가입' : '로그인'}
            </button>
          </form>
        </div>
      )}

      {/* 회원정보 수정 폼 (로그인된 경우에만 표시) */}
      {user && (
        <form onSubmit={updateUserInfo} className="update-form w-[360px]">
          <h3>회원정보 수정</h3>
          <div className="form-group">
            <label htmlFor="updateEmail">새 이메일</label>
            <input
              id="updateEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="새 이메일을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="updatePassword">새 비밀번호</label>
            <input
              id="updatePassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="새 비밀번호를 입력하세요"
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading}>
            정보 수정
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
