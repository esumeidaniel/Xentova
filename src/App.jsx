import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './Components/shared/AuthContext.jsx'
import ProtectedRoute from './Components/shared/ProtectedRoute.jsx'

import Splash from './Components/Dashboard/Splash.jsx'
import Splash1 from './Components/Dashboard/Splash1.jsx'
import Splash2 from './Components/Dashboard/Splash2.jsx'
import Splash3 from './Components/Dashboard/Splash3.jsx'

import Signin from './Components/Signin.jsx'
import Signup from './Components/Signup.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import VerifyOtp from './Components/VerifyOtp.jsx'
import ResetPassword from './Components/ResetPassword.jsx'

import Home from './Components/pages/Home.jsx'
import Profolio from './Components/pages/Profolio.jsx'
import Signals from './Components/pages/Signals.jsx'
import Trade from './Components/pages/Trade.jsx'
import More from './Components/pages/More.jsx'
import Notifications from './Components/pages/Notifications.jsx'
import Deposit from './Components/pages/Deposit.jsx'
import Withdraw from './Components/pages/Withdraw.jsx'
import Leaderboard from './Components/pages/Leaderboard.jsx'
import History from './Components/pages/History.jsx'
import Markets from './Components/pages/Markets.jsx'
import TraderProfile from './Components/pages/TraderProfile.jsx'
import PaymentMethods from './Components/pages/PaymentMethods.jsx'
import Receipt from './Components/pages/Receipt.jsx'
import OrderBook from './Components/pages/OrderBook.jsx'
import RateUs from './Components/pages/RateUs.jsx'
import Kyc from './Components/pages/Kyc.jsx'
import PriceAlerts from './Components/pages/PriceAlerts.jsx'
import Learn from './Components/pages/Learn.jsx'
import News from './Components/pages/News.jsx'
import ApiManagement from './Components/pages/ApiManagement.jsx'
import Referral from './Components/pages/Referral.jsx'
import Support from './Components/pages/Support.jsx'
import Settings from './Components/pages/Settings.jsx'
import Subscription from './Components/pages/Subscription.jsx'
import ConnectWallet from './Components/pages/ConnectWallet.jsx'
import CopyTrading from './Components/pages/CopyTrading.jsx'
import Performance from './Components/pages/Performance.jsx'

import Profile from './Components/Setting/Profile.jsx'
import Security from './Components/Setting/Security.jsx'
import FAQ from './Components/Setting/FAQ.jsx'

import './App.css'

function App() {
  const protect = (page) => <ProtectedRoute>{page}</ProtectedRoute>

  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
        {/* Onboarding */}
        <Route path="/" element={<Splash />} />
        <Route path="/splash1" element={<Splash1 />} />
        <Route path="/splash2" element={<Splash2 />} />
        <Route path="/splash3" element={<Splash3 />} />

        {/* Auth */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main app */}
        <Route path="/home" element={protect(<Home />)} />
        <Route path="/portfolio" element={protect(<Profolio />)} />
        <Route path="/profolio" element={<Navigate to="/portfolio" replace />} />
        <Route path="/trades" element={protect(<Trade />)} />
        <Route path="/signals" element={protect(<Signals />)} />
        <Route path="/more" element={protect(<More />)} />
        <Route path="/notifications" element={protect(<Notifications />)} />
        <Route path="/deposit" element={protect(<Deposit />)} />
        <Route path="/withdraw" element={protect(<Withdraw />)} />
        <Route path="/leaderboard" element={protect(<Leaderboard />)} />
        <Route path="/history" element={protect(<History />)} />
        <Route path="/markets" element={protect(<Markets />)} />
        <Route path="/trader-profile" element={protect(<TraderProfile />)} />
        <Route path="/payment-methods" element={protect(<PaymentMethods />)} />
        <Route path="/receipt" element={protect(<Receipt />)} />
        <Route path="/order-book" element={protect(<OrderBook />)} />
        <Route path="/rate-us" element={protect(<RateUs />)} />
        <Route path="/kyc" element={protect(<Kyc />)} />
        <Route path="/price-alerts" element={protect(<PriceAlerts />)} />
        <Route path="/learn" element={protect(<Learn />)} />
        <Route path="/news" element={protect(<News />)} />
        <Route path="/api-management" element={protect(<ApiManagement />)} />
        <Route path="/referral" element={protect(<Referral />)} />
        <Route path="/support" element={protect(<Support />)} />
        <Route path="/settings" element={protect(<Settings />)} />
        <Route path="/subscription" element={protect(<Subscription />)} />
        <Route path="/connect-wallet" element={protect(<ConnectWallet />)} />
        <Route path="/copy-trading" element={protect(<CopyTrading />)} />
        <Route path="/performance" element={protect(<Performance />)} />

        {/* Settings */}
        <Route path="/profile" element={protect(<Profile />)} />
        <Route path="/security" element={protect(<Security />)} />
        <Route path="/faq" element={protect(<FAQ />)} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
