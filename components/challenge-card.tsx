'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, CheckCircle2, UserPlus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { User } from '@supabase/supabase-js';
import { Challenge } from '@/lib/type';


interface ChallengeCardProps {
  user: User;
  challenge: Challenge;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPublish?: (id: string) => void;
  onEnroll?: (id: string) => void;
}

export function ChallengeCard({
  user,
  challenge,
  onEdit,
  onDelete,
  onPublish,
  onEnroll,
}: ChallengeCardProps) {

  const isAdmin = user.role === 'admin';
  const isExpired = challenge.expires_at ? new Date(challenge.expires_at) < new Date() : false;

  const getTypeColor = (type: string | null) => {
    switch (type) {
      case 'coding':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'design':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'writing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden border-border hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-xl leading-tight">{challenge.title}</CardTitle>
            {challenge.type && (
              <Badge className={`${getTypeColor(challenge.type)} border-0 text-xs font-medium w-fit`}>
                {challenge.type}
              </Badge>
            )}
          </div>
          {isAdmin && challenge.published && (
            <Badge variant="default" className="flex items-center gap-1 h-fit">
              <CheckCircle2 className="h-3 w-3" />
              Published
            </Badge>
          )}
        </div>

        {challenge.description && (
          <CardDescription className="text-sm line-clamp-2">{challenge.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-4 px-5 pb-4">
        {challenge.expires_at && (
          <div className="text-xs text-muted-foreground">
            {isExpired ? (
              <span className="text-destructive font-medium">Expired</span>
            ) : (
              <span>Expires {formatDistanceToNow(new Date(challenge.expires_at), { addSuffix: true })}</span>
            )}
          </div>
        )}


      </CardContent>

      <div className="border-t border-border bg-muted/50 p-5 space-y-2">
        {isAdmin ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => onEdit?.(challenge.id)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
            {!challenge.published && (
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onPublish?.(challenge.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(challenge.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            disabled={isExpired || !challenge.published}
            onClick={() => onEnroll?.(challenge.id)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isExpired ? 'Challenge Expired' : 'Enroll Now'}
          </Button>
        )}
      </div>
    </Card>
  );
}
