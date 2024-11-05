import { useState } from 'react';
import './App.css';
import supabase from './supabaseConfig';

function App() {
  // 상태 관리
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState(''); // 마지막으로 등록된 이메일 저장

  // 메시지 표시 함수
  const showMessage = (type, content) => {
    setMessage({ type, content });
    // 3초 후 메시지 제거
    setTimeout(() => setMessage({ type: '', content: '' }), 3000);
  };

  // 1. 회원 등록 함수
  const signUp = async () => {
    setLoading(true);
    console.log('signUp 함수 호출');

    try {
      const timestamp = new Date().getTime();
      const testEmail = `testuser${timestamp}@example.com`;

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'pwd!12345',
      });

      if (error) throw error;

      setLastRegisteredEmail(testEmail); // 등록된 이메일 저장
      showMessage('success', `회원가입 성공! 이메일: ${testEmail}`);
      console.log('회원가입 성공:', data);
      console.log('사용된 이메일:', testEmail);
    } catch (error) {
      showMessage('error', `회원가입 실패: ${error.message}`);
      console.error('회원가입 에러:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. 로그인 함수
  const login = async () => {
    setLoading(true);
    console.log('login 함수 호출');

    try {
      // 마지막으로 등록된 이메일이 있으면 그것을 사용, 없으면 기본값 사용
      const emailToUse = lastRegisteredEmail || 'testuserB1@example.com';

      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password: 'pwd!12345',
      });

      if (error) throw error;

      setUser(data.user);
      showMessage('success', '로그인 성공!');
      console.log('로그인 성공:', data);
    } catch (error) {
      showMessage('error', `로그인 실패: ${error.message}`);
      console.error('로그인 에러:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. 회원 정보 조회
  const getUserInfo = async () => {
    setLoading(true);
    console.log('getUserInfo 호출됨');

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      setUser(user);
      showMessage('success', '회원정보 조회 성공');
      console.log('getUserInfo data:', user);
    } catch (error) {
      showMessage('error', `회원정보 조회 실패: ${error.message}`);
      console.error('회원정보 조회 에러:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. 회원 정보 수정
  const updateUserInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: `updated${new Date().getTime()}@example.com`,
        password: 'pwd!123456',
      });

      if (error) throw error;

      setUser(data.user);
      showMessage('success', '회원정보 수정 성공');
      console.log('updateUser:', data);
    } catch (error) {
      showMessage('error', `회원정보 수정 실패: ${error.message}`);
      console.error('회원정보 수정 에러:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. 로그아웃 함수 추가
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

  return (
    <div className="container w-[400px] p-4 dark-mode">
      {/* 로딩 인디케이터 */}
      {loading && <div className="loading">처리중...</div>}

      {/* 메시지 표시 */}
      {message.content && <div className={`message ${message.type}`}>{message.content}</div>}

      {/* 현재 로그인된 사용자 정보 표시 */}
      {user && (
        <div className="user-info">
          <h3>현재 로그인된 사용자:</h3>
          <p>이메일: {user.email}</p>
        </div>
      )}

      {/* 버튼 그룹 */}
      <div className="button-group">
        <button onClick={signUp} disabled={loading}>
          회원등록
        </button>
        <button onClick={login} disabled={loading}>
          로그인
        </button>
        <button onClick={getUserInfo} disabled={loading}>
          회원정보 조회
        </button>
        <button onClick={updateUserInfo} disabled={loading}>
          회원정보 수정
        </button>
        <button onClick={logout} disabled={loading}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default App;
