-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================
--
-- 这些策略需要在 Supabase SQL Editor 中执行
-- 确保数据安全和隐私保护
--

-- ============================================
-- 启用 RLS
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 用户表策略
-- ============================================

-- 用户可以查看自己的数据
CREATE POLICY "Users can view own data" ON users
  FOR SELECT
  USING (auth.uid() = id);

-- 用户可以更新自己的数据
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- 纪念页表策略
-- ============================================

-- 公开纪念页任何人可见
CREATE POLICY "Public memorials are viewable by everyone" ON memorials
  FOR SELECT
  USING (privacy = 'public');

-- 链接可见的纪念页（unlisted）
CREATE POLICY "Unlisted memorials are viewable by link" ON memorials
  FOR SELECT
  USING (privacy = 'unlisted');

-- 用户可以查看自己的纪念页
CREATE POLICY "Users can view own memorials" ON memorials
  FOR SELECT
  USING (auth.uid() = user_id);

-- 用户可以创建自己的纪念页
CREATE POLICY "Users can insert own memorials" ON memorials
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的纪念页
CREATE POLICY "Users can update own memorials" ON memorials
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 用户可以删除自己的纪念页
CREATE POLICY "Users can delete own memorials" ON memorials
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 照片表策略
-- ============================================

-- 照片可见性跟随纪念页
CREATE POLICY "Photos are viewable if memorial is viewable" ON photos
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND (
        memorials.privacy = 'public'
        OR memorials.privacy = 'unlisted'
        OR memorials.user_id = auth.uid()
      )
    )
  );

-- 用户可以管理自己纪念页的照片
CREATE POLICY "Users can manage own memorial photos" ON photos
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = photos.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- ============================================
-- 留言表策略
-- ============================================

-- 已批准的留言任何人可见
CREATE POLICY "Approved tributes are viewable by everyone" ON tributes
  FOR SELECT
  USING (is_approved = true);

-- 纪念页创建者可以查看所有留言（包括待审核）
CREATE POLICY "Memorial owners can view all tributes" ON tributes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = tributes.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- 任何人可以创建留言（但默认未批准）
CREATE POLICY "Anyone can create tributes" ON tributes
  FOR INSERT
  WITH CHECK (true);

-- 纪念页创建者可以更新留言状态（批准/拒绝）
CREATE POLICY "Memorial owners can update tributes" ON tributes
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = tributes.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- 纪念页创建者可以删除留言
CREATE POLICY "Memorial owners can delete tributes" ON tributes
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM memorials
      WHERE memorials.id = tributes.memorial_id
      AND memorials.user_id = auth.uid()
    )
  );

-- ============================================
-- 订阅表策略
-- ============================================

-- 用户可以查看自己的订阅
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- 用户可以创建自己的订阅
CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 用户可以更新自己的订阅
CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 数据库函数：自动更新 updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- 触发器：自动更新时间戳
-- ============================================

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_memorials_updated_at ON memorials;
CREATE TRIGGER update_memorials_updated_at
  BEFORE UPDATE ON memorials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 索引优化
-- ============================================

-- 纪念页相关索引
CREATE INDEX IF NOT EXISTS idx_memorials_user_id ON memorials(user_id);
CREATE INDEX IF NOT EXISTS idx_memorials_slug ON memorials(slug);
CREATE INDEX IF NOT EXISTS idx_memorials_privacy ON memorials(privacy);
CREATE INDEX IF NOT EXISTS idx_memorials_created_at ON memorials(created_at DESC);

-- 照片相关索引
CREATE INDEX IF NOT EXISTS idx_photos_memorial_id ON photos(memorial_id);
CREATE INDEX IF NOT EXISTS idx_photos_display_order ON photos(memorial_id, display_order);

-- 留言相关索引
CREATE INDEX IF NOT EXISTS idx_tributes_memorial_id ON tributes(memorial_id);
CREATE INDEX IF NOT EXISTS idx_tributes_is_approved ON tributes(is_approved);
CREATE INDEX IF NOT EXISTS idx_tributes_created_at ON tributes(created_at DESC);

-- 订阅相关索引
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- Storage 策略 (Supabase Storage)
-- ============================================

-- 注意：这需要在 Supabase Dashboard 的 Storage 界面配置
-- 或者通过 Supabase SQL Editor 执行

-- 创建 memorial-photos bucket (如果还没有)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('memorial-photos', 'memorial-photos', true);

-- 允许用户上传到自己的纪念页文件夹
-- CREATE POLICY "Users can upload photos to own memorials"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'memorial-photos' AND
--   (storage.foldername(name))[1] IN (
--     SELECT id::text FROM memorials WHERE user_id = auth.uid()
--   )
-- );

-- 所有人可以查看公开的照片
-- CREATE POLICY "Anyone can view public memorial photos"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'memorial-photos');

-- 用户可以删除自己纪念页的照片
-- CREATE POLICY "Users can delete own memorial photos"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'memorial-photos' AND
--   (storage.foldername(name))[1] IN (
--     SELECT id::text FROM memorials WHERE user_id = auth.uid()
--   )
-- );
