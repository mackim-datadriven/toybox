import { ArtifactMetadata } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Sparkles, Gift } from 'lucide-react';

export const metadata: ArtifactMetadata = {
  title: '뿡뿡이의 홈페이지',
  description: '귀여운 뿡뿡이의 개인 홈페이지',
  type: 'react',
  tags: ['homepage', 'cute', 'kawaii', 'personal'],
  folder: 'Personal Sites',
  createdAt: '2025-09-17T06:32:41Z',
  updatedAt: '2025-09-17T06:32:41Z',
};

const PpongPpongHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Header */}
      <header className="text-center py-8">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-2">
            뿡뿡이의 홈페이지
          </h1>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-2">안녕하세요! 귀여운 뿡뿡이예요 💕</p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {/* Profile Section */}
        <Card className="mb-8 overflow-hidden bg-white/80 backdrop-blur-sm border-pink-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Cute Character */}
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center border-4 border-pink-300 shadow-lg">
                  <div className="text-center">
                    {/* Simple cute character made with text/emojis */}
                    <div className="text-6xl mb-2">🌸</div>
                    <div className="relative">
                      <div className="text-2xl">😊</div>
                      <div className="absolute -top-4 -left-2 text-lg">💫</div>
                      <div className="absolute -top-2 right-0 text-sm">✨</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <Heart className="w-8 h-8 text-pink-500 animate-bounce" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold text-pink-600 mb-4">뿡뿡이</h2>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>나이: 영원한 18세</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span>좋아하는 것: 분홍색, 꽃, 케이크</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span>특기: 귀여움 발산하기</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">귀여움</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">상큼함</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">사랑스러움</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                뿡뿡이 소개
              </h3>
              <p className="text-gray-700 leading-relaxed">
                안녕하세요! 저는 세상에서 가장 귀여운 뿡뿡이예요! 🌸
                매일매일 행복하고 즐거운 일들로 가득한 삶을 살고 있어요.
                분홍색을 사랑하고, 예쁜 꽃들과 달콤한 케이크를 좋아해요!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                취미 & 관심사
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  예쁜 옷 입기
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  꽃밭에서 산책하기
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  친구들과 놀기
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  맛있는 디저트 먹기
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">뿡뿡이와 친구하기</h3>
            <p className="text-gray-700 mb-6">저와 친구가 되고 싶으시다면 언제든 연락주세요!</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                💌 메시지 보내기
              </Button>
              <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50">
                🌸 친구 신청
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                ✨ 선물하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-pink-400" />
          <span>Made with love by 뿡뿡이</span>
          <Heart className="w-4 h-4 text-pink-400" />
        </div>
        <p className="text-sm">© 2025 뿡뿡이의 홈페이지. All rights reserved. 💕</p>
      </footer>
    </div>
  );
};

export default PpongPpongHomepage;