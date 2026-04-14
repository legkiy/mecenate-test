import { Colors } from '@/constants/theme';
import Chip from '@/shared/ui/Chip';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { postService } from '../../service';

type Props = {
  initCounts?: number;
  postId: string;
  initIsLiked: boolean;
};
const LikeCounts = ({ initCounts, initIsLiked, postId }: Props) => {
  const [count, setCount] = useState(initCounts);
  const [isLiked, setIsLiked] = useState(initIsLiked);

  const toggleLike = async () => {
    const res = await postService.toggleLike(postId);
    setCount(res.data?.likesCount || initCounts);
    setIsLiked(res.data?.isLiked || initIsLiked);
  };

  return (
    <Chip
      onPress={toggleLike}
      label={String(count)}
      style={[
        isLiked && {
          backgroundColor: Colors.surface.accent,
        },
      ]}
      textStyle={[
        isLiked && {
          color: Colors.text.accent,
        },
      ]}
      startIcon={
        <FontAwesome
          name={isLiked ? 'heart' : 'heart-o'}
          size={22}
          color={isLiked ? Colors.text.accent : Colors.text.mute}
        />
      }
    />
  );
};
export default LikeCounts;
